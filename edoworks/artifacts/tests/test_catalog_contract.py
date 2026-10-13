import json
import hashlib
import os
from pathlib import Path
import unittest
import urllib.error
import urllib.parse
import urllib.request


ROOT = Path(__file__).resolve().parents[1]


def parse_catalog() -> dict[str, dict[str, object]]:
    document = json.loads((ROOT / "catalog.yaml").read_text())
    if document.get("schema_version") != 1:
        raise ValueError("unsupported catalog schema")
    records = document.get("artifacts")
    if not isinstance(records, list):
        raise ValueError("catalog artifacts must be a list")
    by_id = {str(record["id"]): record for record in records}
    if len(by_id) != len(records):
        raise ValueError("catalog artifact ids must be unique")
    return by_id


def github_json(url: str) -> dict:
    request = urllib.request.Request(url)
    request.add_header("Accept", "application/vnd.github+json")
    if token := os.environ.get("GITHUB_TOKEN"):
        request.add_header("Authorization", f"Bearer {token}")
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.loads(response.read())


class CatalogContractTests(unittest.TestCase):
    expected = {
        "reusefirst": {
            "tag": "reusefirst/v1.2.1",
            "license": "Apache-2.0",
            "distribution": "none-currently-supported",
            "release_immutable": False,
            "attached_asset_count": 0,
            "status": "released-known-defects",
        },
        "constitution": {
            "tag": "constitution/v1.0.0",
            "license": "MIT",
            "distribution": "github-release-assets",
            "release_immutable": False,
            "attached_asset_count": 5,
            "status": "released",
        },
        "asc": {
            "tag": "asc/v1.0.0",
            "license": "MIT",
            "distribution": "github-release-assets",
            "release_immutable": False,
            "attached_asset_count": 5,
            "status": "released",
        },
    }

    def test_catalog_matches_manifests_and_licenses(self):
        catalog = parse_catalog()
        self.assertEqual(set(catalog), set(self.expected))

        for artifact_id, expected in self.expected.items():
            record = catalog[artifact_id]
            artifact_path = ROOT / str(record["path"])
            manifest = json.loads((artifact_path / "MANIFEST.json").read_text())
            self.assertEqual(record["version"], manifest["version"])
            self.assertTrue(str(record["tag"]).endswith(f"/v{record['version']}"))
            self.assertEqual(record["tag"], expected["tag"])
            self.assertEqual(record["license"], expected["license"])
            self.assertEqual(record["distribution"], expected["distribution"])
            self.assertEqual(record["release_immutable"], expected["release_immutable"])
            self.assertEqual(record["attached_asset_count"], expected["attached_asset_count"])
            self.assertEqual(record["status"], expected["status"])
            self.assertTrue((artifact_path / "LICENSE").is_file())

        apache_terms = ROOT / "artifacts/reusefirst/LICENSE-APACHE-2.0"
        self.assertEqual(
            hashlib.sha256(apache_terms.read_bytes()).hexdigest(),
            "c71d239df91726fc519c6eb72d318ec65820627232b2f796219e87dcf35d0ab4",
        )

    def test_catalog_matches_live_release_records(self):
        for expected in self.expected.values():
            tag = str(expected["tag"])
            encoded_tag = urllib.parse.quote(tag, safe="")
            url = (
                "https://api.github.com/repos/edoworks/artifacts/releases/tags/"
                f"{encoded_tag}"
            )
            try:
                release = github_json(url)
            except urllib.error.HTTPError as error:
                self.fail(f"GitHub release API returned {error.code} for {tag}")
            self.assertEqual(release.get("tag_name"), tag)
            self.assertFalse(release.get("draft", True))
            self.assertFalse(release.get("prerelease", True))
            self.assertEqual(release.get("immutable"), expected["release_immutable"])
            self.assertEqual(len(release.get("assets", [])), expected["attached_asset_count"])

    def test_documentation_does_not_overstate_release_properties(self):
        readme = (ROOT / "README.md").read_text()
        security = (ROOT / "SECURITY.md").read_text()
        reusefirst_readme = (ROOT / "artifacts/reusefirst/README.md").read_text()

        self.assertNotIn("Releases use immutable", readme)
        self.assertNotIn("Releases are immutable", security)
        self.assertIn("current releases\nare mutable", security)
        self.assertIn("does\nnot provide an attached checksum asset", reusefirst_readme)
        self.assertIn("no repository-wide default license", (ROOT / "LICENSING.md").read_text())

    def test_reusefirst_tag_defects_are_explicit(self):
        catalog = parse_catalog()["reusefirst"]
        self.assertEqual(catalog["status"], "released-known-defects")
        self.assertEqual(
            catalog.get("known_defects"),
            [
                "tag omits complete Apache-2.0 terms",
                "tag documentation promises an unavailable checksum",
            ],
        )

        tag = urllib.parse.quote(str(catalog["tag"]), safe="")
        license_url = (
            "https://api.github.com/repos/edoworks/artifacts/contents/"
            f"artifacts/reusefirst/LICENSE-APACHE-2.0?ref={tag}"
        )
        with self.assertRaises(urllib.error.HTTPError) as context:
            github_json(license_url)
        self.assertEqual(context.exception.code, 404)

        readme_url = (
            "https://raw.githubusercontent.com/edoworks/artifacts/"
            f"{tag}/artifacts/reusefirst/README.md"
        )
        with urllib.request.urlopen(readme_url, timeout=30) as response:
            tagged_readme = response.read().decode("utf-8")
        self.assertIn("source revision, and checksum", tagged_readme)


if __name__ == "__main__":
    unittest.main()

# Edoworks Artifacts

Versioned, reusable artifacts from Edoworks.

## Catalog

| Artifact | Version | Download | License |
| --- | --- | --- | --- |
| [reusefirst](artifacts/reusefirst/) | 1.2.1 | [Historical release record](https://github.com/edoworks/artifacts/releases/tag/reusefirst%2Fv1.2.1) | Apache-2.0 |
| [constitution](artifacts/constitution/) | 1.0.0 | [Release assets](https://github.com/edoworks/artifacts/releases/tag/constitution%2Fv1.0.0) | MIT |
| [asc](artifacts/asc/) | 1.0.0 | [Release assets](https://github.com/edoworks/artifacts/releases/tag/asc%2Fv1.0.0) | MIT |

Each artifact is independently versioned and licensed; see
[LICENSING.md](LICENSING.md). Distribution properties are recorded per artifact
rather than inferred from a tag. The `reusefirst/v1.2.1` release is stable but
mutable, has no attached assets, omits the complete Apache terms, and promises
a checksum it does not provide. It is retained as a historical record, not a
supported download. The corrected source on `main` is not a new release. The
constitution and ASC releases provide attached archives and digest-bearing
manifests, but their GitHub release records are also mutable.

Each artifact directory, manifest, and future release tag uses the same
canonical artifact name. Agent-facing skills remain inside their artifact
directory and do not create a second public source tree.

## Scope

These artifacts are advisory local tools. They do not grant publication,
installation, release, authorization, sandboxing, or security authority.

## Support

For bugs or usage questions about this retained artifact catalog, open an issue
in [edoworks/factory](https://github.com/edoworks/factory/issues/new) and identify
the artifact and version. See [SECURITY.md](SECURITY.md) for vulnerability
reporting and the unchanged best-effort support boundary.

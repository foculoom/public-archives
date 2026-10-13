# Provenance

- Origin: Edoworks reuse and contribution-gate increment.
- Generalization: extracted from an internal ecosystem-compounding increment;
  no product source, secrets, user data, or external artifact was included.
- Review: deterministic contract tests and Customer Zero dogfood are the
  current release evidence. Publication approval is recorded for this release;
  consuming factories maintain detailed product evidence separately rather
  than embedding private product details in this public artifact.
- Skill surface: `SKILL.md` is a generic procedural wrapper around the same
  decision contract; it contains no private factory paths, product context, or
  external instructions.
- Boundary: the package remains dependency-free and local-only. Its pinned
  entrypoint was exercised by the factory and product workflows; no external
  instructions or network service are required by the contract.

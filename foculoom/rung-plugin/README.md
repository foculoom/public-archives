# Rung Plugin (opencode-rung-plugin) — ARCHIVED

This repository is an **archived retirement record**. The plugin is no
longer maintained, and the paid Rung audit it originally funneled to at
`rung.dev` was **never launched**.

The active Rung project is the free MIT-licensed repository-evidence audit
engine owned by Foculoom LLC and built by Edoworks:

- Source: https://github.com/edoworks/rung
- Site: https://rung.edoworks.com

## Historical scope (for the record)

The plugin added a `rung_check` custom tool to opencode that ran Rung
governance validation against a repository and reported AI-assisted
development governance gaps in:

- **AGENTS.md** — agent operating policy with approval gates and forbidden-action list
- **Requirements workflow** — `templates/task-contract.md` with testable acceptance criteria
- **Traceability** — `templates/traceability-matrix.md` (requirement → implementation → test → evidence)
- **Local verification** — a `Makefile` with a `verify` target that runs without external services
- **Session evidence** — a session ledger recording what each agent run did
- **Standards** — anti-hallucination, validation ladder, session lifecycle

No paid product, service, or audit is offered through this repository.

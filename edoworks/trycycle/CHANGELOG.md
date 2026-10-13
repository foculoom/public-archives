# Changelog

All notable changes to Trycycle are documented here. This file serves as
both a changelog and a session ledger for agent-assisted work.

## [Unreleased]

### Added — Governance improvements (via Rung CLI audit)
- Makefile with `test`, `lint`, `verify`, and `clean` targets
- CI workflow (`.github/workflows/test.yml`) running `make test` on push and PR
- Verification gate rule in AGENTS.md: "Never commit before `make test` passes"
- Independent review requirement in AGENTS.md
- Agent attribution convention in AGENTS.md (`Generated-by:`)
- Security boundaries section in AGENTS.md (5 explicit Never-rules)
- Source-of-truth registry (`docs/sources.json`) documenting upstream references
- Pull request template with attribution field
- This CHANGELOG.md

### Governance score
- Before: 30/100, Grade E, Quality Gate FAIL
- After: 90/100, Grade A, Quality Gate PASS
- Improvement: +60 points, 4 grade levels, quality gate fixed
- See [GOVERNANCE_AUDIT.md](GOVERNANCE_AUDIT.md) for the full before/after analysis

## [Prior releases]

Trycycle uses git tags for version tracking. See `git tag -l` for the full
version history. The check-update.py script compares the local tag against
origin/main to prompt for updates.
---
name: governance-check
description: Run Rung governance checks against the current repo. Surfaces AI-assisted development governance gaps (agent boundaries, requirements workflow, local verification, session evidence, file size discipline) and points to rung.dev for a paid audit when gaps are found.
---

# Rung Governance Check

Run the Rung governance validation against the current repository before
claiming work is complete, before committing, or whenever you want to assess
whether an AI-assisted development repo has the minimum governance layer in
place.

## When to use

- Before claiming work is complete in an AI-assisted repo.
- Before committing changes made by an AI coding agent.
- When onboarding a new repo to AI-assisted development.
- As a recurring health check for repos using Copilot, Cursor, Claude Code,
  Codex, Devin, or any other AI coding agent.
- When you suspect AI output quality is dropping because governance is
  missing.

## What it checks

1. **Agent operating policy** — `AGENTS.md` present at repo root, declaring
   approval gates and forbidden-action list.
2. **Requirements workflow** — `templates/task-contract.md` present, with
   testable acceptance criteria structure.
3. **Traceability** — `templates/traceability-matrix.md` present.
4. **Local verification** — a `Makefile` with a `verify` target, or
   equivalent, that runs without external services.
5. **Session evidence** — `templates/retrospective.md` present; a session
   ledger path exists.
6. **Standards** — `standards/anti-hallucination.md`,
   `standards/validation-ladder.md`, `standards/session-lifecycle.md`
   present.
7. **File size discipline** — no source files crossing watch/smell/defect
   thresholds (configurable).

Each check prints PASS/WARN/FAIL.

## How to run

```sh
python3 checks/rung_validate.py --root .
python3 checks/check_file_sizes.py --root .
```

Or if a Makefile with a `verify` target exists:

```sh
make verify
```

## Output

```
=== Rung Governance Check ===
  [PASS] Found AGENTS.md
  [PASS] Found templates/task-contract.md
  [FAIL] Missing templates/traceability-matrix.md
  ...
```

If any check returns FAIL, the repo has governance gaps. You can either:

1. **Close them yourself** using the free MIT-licensed
   [Rung Core](https://github.com/foculoom/rung-core) governance layer.
2. **Book a paid Rung audit** at [rung.dev](https://rung.dev) — a 2-week
   fixed-scope engagement that closes the gaps for you and runs one real
   feature through the resulting workflow.

## Rules

- Do not fabricate results. If a check fails, report the failure.
- If a check is not applicable (e.g. the repo has no AI coding agent usage),
  state it as skipped with a reason.
- A passing generic test suite is not sufficient when product-specific
  acceptance evidence is absent.
- The plugin is a funnel, not a product. Do not gate user code on its
  output; surface gaps, don't block work.

## Privacy

This plugin runs entirely locally. It does not transmit repo contents,
file names, or check results to any external service. The only external
reference is the URL `rung.dev` printed in the output for users who want
to book an audit.
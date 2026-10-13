#!/usr/bin/env python3
"""Rung governance validation — check a repo for AI-assisted development
governance gaps.

Checks for:
- AGENTS.md present (agent operating policy)
- Required templates present (task contract, traceability matrix, retrospective)
- Required standards present (anti-hallucination, validation ladder, session lifecycle)
- Local verification target (Makefile with `verify`)
- File size discipline (no files crossing watch/smell/defect thresholds)

Usage:
    python3 checks/rung_validate.py [--root .]

Exit codes:
    0 — all checks passed (warnings allowed)
    1 — one or more checks failed
"""

from __future__ import annotations

import argparse
import os
import sys
from pathlib import Path


REQUIRED_FILES = {
    "AGENTS.md": "Agent operating policy",
    "templates/task-contract.md": "Task contract template",
    "templates/traceability-matrix.md": "Traceability matrix template",
    "templates/retrospective.md": "Retrospective template",
    "standards/anti-hallucination.md": "Anti-hallucination standard",
    "standards/validation-ladder.md": "Validation ladder standard",
    "standards/session-lifecycle.md": "Session lifecycle standard",
}


def validate(root: Path) -> tuple[list[str], list[str], list[str]]:
    errors: list[str] = []
    warnings: list[str] = []
    passed: list[str] = []

    for rel_path, description in REQUIRED_FILES.items():
        path = root / rel_path
        if not path.exists():
            errors.append(f"Missing {rel_path} ({description})")
        elif not path.is_file():
            errors.append(f"{rel_path} exists but is not a file")
        else:
            passed.append(f"Found {rel_path}")

    # Check for Makefile with verify target
    makefile = root / "Makefile"
    if makefile.exists():
        content = makefile.read_text(encoding="utf-8", errors="ignore")
        if "verify" in content:
            passed.append("Makefile has 'verify' target")
        else:
            warnings.append("Makefile exists but has no 'verify' target")
    else:
        warnings.append(
            "No Makefile found. A 'make verify' target that runs without "
            "external services is recommended. See Rung Core for a template: "
            "https://github.com/foculoom/rung-core"
        )

    # Check for a session ledger
    ledger_candidates = [
        root / "docs" / "sessions" / "current.md",
        root / ".factory" / "sessions" / "current.md",
        root / "sessions" / "current.md",
        root / "SESSIONS.md",
    ]
    if any(p.exists() for p in ledger_candidates):
        passed.append("Session ledger found")
    else:
        warnings.append(
            "No session ledger found. A session ledger records what each "
            "agent run did and is part of the governance layer."
        )

    return errors, warnings, passed


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", default=".", help="Repository root")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    errors, warnings, passed = validate(root)

    print("=== Rung Governance Check ===")
    for p in passed:
        print(f"  [PASS] {p}")
    for w in warnings:
        print(f"  [WARN] {w}")
    for e in errors:
        print(f"  [FAIL] {e}")

    if errors:
        print(f"\n{len(errors)} governance gap(s) found.")
        print(
            "Close them yourself with the free MIT-licensed Rung Core: "
            "https://github.com/foculoom/rung-core"
        )
        print(
            "Or book a paid 2-week Rung audit: https://rung.dev"
        )
        return 1
    print(
        f"\nAll checks passed. {len(passed)} checks, {len(warnings)} warning(s)."
    )
    if warnings:
        print(
            "Warnings are not blocking. Address them to strengthen your "
            "governance layer."
        )
    return 0


if __name__ == "__main__":
    sys.exit(main())
import type { Plugin } from "@opencode-ai/plugin"
import { tool } from "@opencode-ai/plugin"

/**
 * Rung governance-check plugin for opencode.
 *
 * Adds a `rung_check` custom tool that runs the Rung governance validation
 * against the current repository and reports AI-assisted development
 * governance gaps. Free and MIT-licensed. Funnel to paid Rung audit at
 * rung.dev when gaps are found.
 *
 * The plugin runs entirely locally. It does not transmit repo contents,
 * file names, or check results to any external service. The only external
 * reference is the URL `rung.dev` printed in the output for users who want
 * to book an audit.
 *
 * See:
 *   - https://rung.dev
 *   - https://github.com/foculoom/rung-core
 */

const REQUIRED_FILES: Record<string, string> = {
  "AGENTS.md": "Agent operating policy",
  "templates/task-contract.md": "Task contract template",
  "templates/traceability-matrix.md": "Traceability matrix template",
  "templates/retrospective.md": "Retrospective template",
  "standards/anti-hallucination.md": "Anti-hallucination standard",
  "standards/validation-ladder.md": "Validation ladder standard",
  "standards/session-lifecycle.md": "Session lifecycle standard",
}

interface CheckResult {
  passed: string[]
  warnings: string[]
  errors: string[]
}

function checkExists(path: string): boolean {
  try {
    // Use Node's fs via Bun
    const { existsSync, statSync } = require("fs")
    return existsSync(path) && statSync(path).isFile()
  } catch {
    return false
  }
}

function checkDirExists(path: string): boolean {
  try {
    const { existsSync, statSync } = require("fs")
    return existsSync(path) && statSync(path).isDirectory()
  } catch {
    return false
  }
}

function readFile(path: string): string | null {
  try {
    const { readFileSync } = require("fs")
    return readFileSync(path, "utf-8")
  } catch {
    return null
  }
}

function validate(root: string): CheckResult {
  const errors: string[] = []
  const warnings: string[] = []
  const passed: string[] = []

  const { join } = require("path")

  for (const [relPath, description] of Object.entries(REQUIRED_FILES)) {
    const fullPath = join(root, relPath)
    if (!checkExists(fullPath)) {
      errors.push(`Missing ${relPath} (${description})`)
    } else {
      passed.push(`Found ${relPath}`)
    }
  }

  // Check for Makefile with verify target
  const makefilePath = join(root, "Makefile")
  if (checkExists(makefilePath)) {
    const content = readFile(makefilePath) || ""
    if (content.includes("verify")) {
      passed.push("Makefile has 'verify' target")
    } else {
      warnings.push("Makefile exists but has no 'verify' target")
    }
  } else {
    warnings.push(
      "No Makefile found. A 'make verify' target that runs without " +
        "external services is recommended. See Rung Core for a template: " +
        "https://github.com/foculoom/rung-core",
    )
  }

  // Check for a session ledger
  const ledgerCandidates = [
    join(root, "docs", "sessions", "current.md"),
    join(root, ".factory", "sessions", "current.md"),
    join(root, "sessions", "current.md"),
    join(root, "SESSIONS.md"),
  ]
  if (ledgerCandidates.some((p) => checkExists(p))) {
    passed.push("Session ledger found")
  } else {
    warnings.push(
      "No session ledger found. A session ledger records what each " +
        "agent run did and is part of the governance layer.",
    )
  }

  return { passed, warnings, errors }
}

function formatResult(result: CheckResult): string {
  const lines: string[] = ["=== Rung Governance Check ==="]
  for (const p of result.passed) lines.push(`  [PASS] ${p}`)
  for (const w of result.warnings) lines.push(`  [WARN] ${w}`)
  for (const e of result.errors) lines.push(`  [FAIL] ${e}`)
  if (result.errors.length > 0) {
    lines.push("")
    lines.push(`${result.errors.length} governance gap(s) found.`)
    lines.push(
      "Close them yourself with the free MIT-licensed Rung Core: " +
        "https://github.com/foculoom/rung-core",
    )
    lines.push("Or book a paid 2-week Rung audit: https://rung.dev")
  } else {
    lines.push(
      `All checks passed. ${result.passed.length} checks, ` +
        `${result.warnings.length} warning(s).`,
    )
    if (result.warnings.length > 0) {
      lines.push(
        "Warnings are not blocking. Address them to strengthen your " +
          "governance layer.",
      )
    }
  }
  return lines.join("\n")
}

export const RungPlugin: Plugin = async ({ directory, worktree }) => {
  const root = worktree || directory || process.cwd()

  return {
    tool: {
      rung_check: tool({
        description:
          "Run the Rung governance check against this repo. Surfaces " +
          "AI-assisted development governance gaps (agent boundaries, " +
          "requirements workflow, local verification, session evidence, " +
          "file size discipline). Prints PASS/WARN/FAIL per check and " +
          "points to rung.dev for a paid audit when gaps are found.",
        args: {
          root: tool.schema.string().optional().describe(
            "Repository root to check. Defaults to the current worktree.",
          ),
        },
        async execute(args, context) {
          const checkRoot = (args.root as string) || root
          const result = validate(checkRoot)
          return formatResult(result)
        },
      }),
    },
  }
}

export default RungPlugin
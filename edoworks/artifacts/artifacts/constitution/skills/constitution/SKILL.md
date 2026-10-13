---
name: constitution
description: Templates for a thin-agent-factory constitution and governance: North Star mission, policy caps (work-share, friction gate, product freeze), PRD template, and evidence-based 5-Whys incident shape. Use when bootstrapping a lean factory or auditing an existing one for over-engineering.
---

# constitution

Install:

```bash
npx skills add edoworks/factory-constitution --skill constitution
```

Use these to establish or audit a lean agent-driven software factory:

- `templates/NORTH_STAR.md.template` — the mission + hierarchy + immutable vs learnable + entropy discipline + bypass invariant.
- `templates/constitution.json.template` — machine-readable policy/caps (work share, freeze days, friction gate, simplification order).
- `templates/fivewhys.incident.json.template` — evidence-based 5-Whys with an explicit root cause + recurrence guard.

Rules of use:
- The constitution is canonical; all agent instructions and policies must stay consistent with it.
- Never weaken the bypass invariant (clone + verify without the orchestrator).
- Only publish the *templates*; never copy a specific product's private state into them.
- Earn each artifact with measured friction (or don't add it).

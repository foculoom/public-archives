# constitution (template)

Templates for running a lean agent-driven software factory without over-engineering.

## Problem

As factories accumulate governance, they tend to consolidate themselves — more
validators, more routing complexity, more consolidation — rather than ship product.
This template is the minimal set of canonical documents that keep the factory
focused on **verified human value per unit of human attention, risk, and cost**.

## What's here

- `templates/NORTH_STAR.md.template` — one-page mission, priority hierarchy, immutable
  vs learnable policy boundaries, entropy discipline, bypass invariant.
- `templates/constitution.json.template` — machine-checkable policy caps:
  factory work share ≤10% (bootstrap ≤30%), 7-day product freeze, friction-count ≥3
  gate, simplification ordering.
- `templates/fivewhys.incident.json.template` — evidence-based 5-Whys incident shape
  with an explicit root cause and a recurrence guard.

## How to use

Copy the templates into your factory repo, fill the bracketed placeholders, and
treat them as canonical. Keep agent-facing instructions consistent with them.
Do not build the full orchestration/monitoring/learning stack first — earn each
capability by measured product pain.

## License

MIT — see `LICENSE`.

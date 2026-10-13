# Delivery scorecard

A static, manually reviewed public snapshot of two projects with working names. Serve this directory with any static HTTP server. No build, dependencies, analytics or external assets are required.

`data/scorecard.json` is the portable public record. Unknown measurements are `null`; event dates are distinct from record-review dates. Counts of heterogeneous technical checks are intentionally not combined into a success rate. Elapsed time requires evidenced start/end boundaries and never represents active work hours.

To update: review approved evidence, edit the JSON, set the review date, append a dated history entry (including corrections), run validation and browser checks, then publish the reviewed commit. Updates are manual, not continuous. Do not add private source links, local paths, personal information, credentials or internal working material. Local browser notes are not implemented.

GitHub Pages serves the repository root. Organization domain settings are managed separately.

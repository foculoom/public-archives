# Public repository archive

This repository preserves browsable snapshots and complete Git bundles for nine formerly public edoworks and foculoom repositories. The original repositories are still online while Pages and public-access dependencies are reviewed. The private [foculoom/archives](https://github.com/foculoom/archives) remains the primary archive for all 81 sources.

- Browse `edoworks/<repo>/` or `foculoom/<repo>/` for the original default-branch snapshot.
- `backups/<org>/<repo>.bundle` stores the original branches, tags, pull refs, and history. Restore with `git clone backups/<org>/<repo>.bundle <target>`.
- `metadata/<org>/<repo>/` contains exported public issues, pull requests, comments, reviews, releases, and release assets where present. These JSON records do not recreate live GitHub issues or PRs.
- `index.json` records each original URL, branch, commit, ref count, bundle path, size, and SHA-256.

The snapshots are fixed to the source state recorded on 2026-10-12. Pages sites are not hosted from this archive. See each original repository for its live Pages configuration while it remains online.

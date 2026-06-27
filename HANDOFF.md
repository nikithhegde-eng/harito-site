# Harito Handoff

Last updated: 2026-06-27

## Current State

- The project is connected to GitHub at `https://github.com/nikithhegde-eng/harito-site`.
- The local `main` branch is tracking `origin/main`.
- A root `CLAUDE.md` is present so Claude Code can read project instructions.
- Runtime order data is ignored through `data/*.json`.

## Recently Completed

- Added Node backend for catalog, checkout order records, buyer order lookup, returns, admin analytics, automation queue, admin status updates, and payment webhook placeholder.
- Reworked the storefront so products add to a Harito cart instead of redirecting to vendor websites.
- Added admin dashboard scripts that read live backend analytics.
- Added vendor outreach and tracker updates for managed commerce terms.

## Next Recommended Work

- Configure GitHub authentication on the local machine if future pushes fail.
- Add a real payment provider only after legal pages and vendor terms are ready.
- Replace sample image/catalog entries with vendor-approved catalog data.
- Add a production database before using this for real customer orders.
- Add admin authentication before exposing the admin dashboard publicly.

## Session Rule

At the end of every Codex or Claude session, update:

- `HANDOFF.md` with current state and next work.
- `PROJECT_LOG.md` with a dated summary.

Do not paste full chat transcripts into the repo.

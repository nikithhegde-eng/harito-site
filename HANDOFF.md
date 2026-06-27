# Harito Handoff

Last updated: 2026-06-27

## Current State

- The project is connected to GitHub at `https://github.com/nikithhegde-eng/harito-site`.
- The local `main` branch is tracking `origin/main`.
- A root `CLAUDE.md` is present so Claude Code can read project instructions.
- Runtime order data is ignored through `data/*.json`.
- The six launch assignments have been started in the repo: deployment, database, admin access, payment setup, vendor catalog onboarding, and Codex-Claude sync.

## Recently Completed

- Added Node backend for catalog, checkout order records, buyer order lookup, returns, admin analytics, automation queue, admin status updates, and payment webhook placeholder.
- Reworked the storefront so products add to a Harito cart instead of redirecting to vendor websites.
- Added admin dashboard scripts that read live backend analytics.
- Added vendor outreach and tracker updates for managed commerce terms.
- Restored the backend server file after it was found empty in the latest local state.
- Added deployment config, environment template, database schema draft, payment setup notes, vendor catalog template, and admin token login handling.

## Next Recommended Work

- Choose the deployment platform and add real environment variables there.
- Pick a managed Postgres provider and replace local JSON order storage with database writes.
- Add a full user/admin auth provider before public launch.
- Create a Razorpay or payment gateway account only after legal pages and vendor terms are ready.
- Send vendors `vendor-catalog-template.csv` and store approvals in `VENDOR_TRACKER.md`.
- Replace sample image/catalog entries with vendor-approved catalog data.

## Session Rule

At the end of every Codex or Claude session, update:

- `HANDOFF.md` with current state and next work.
- `PROJECT_LOG.md` with a dated summary.

Do not paste full chat transcripts into the repo.

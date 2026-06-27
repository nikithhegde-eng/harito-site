# Harito Handoff

Last updated: 2026-06-27

## Current State

- The project is connected to GitHub at `https://github.com/nikithhegde-eng/harito-site`.
- The local `main` branch is tracking `origin/main`.
- A root `CLAUDE.md` is present so Claude Code can read project instructions.
- Runtime order data is ignored through `data/*.json`.
- The storefront direction is now affiliate-first. Do not continue Razorpay, UPI, or direct Harito payment work unless Nikith explicitly asks to restart it.

## Recently Completed

- Added Node backend for catalog, checkout order records, buyer order lookup, returns, admin analytics, automation queue, admin status updates, and payment webhook placeholder.
- Reworked the storefront so products open partner/affiliate links instead of using Harito cart checkout.
- Added admin dashboard scripts that read live backend analytics.
- Added vendor outreach and tracker updates for managed commerce terms.
- Restored the backend server file after it was found empty in the latest local state.
- Added deployment config, environment template, database schema draft, payment setup notes, vendor catalog template, and admin token login handling.
- Reworked the homepage product cards to open partner/affiliate links and use free Unsplash fashion photos as preview visuals.

## Next Recommended Work

- Choose the deployment platform and add real environment variables there.
- Pick a managed Postgres provider and replace local JSON order storage with database writes.
- Add a full user/admin auth provider before public launch.
- Apply to affiliate programs and replace current destination URLs with approved tracked links.
- Send vendors or networks `vendor-catalog-template.csv` only when catalog/feed approval is needed.
- Replace Unsplash preview visuals with official product images only after image rights are approved.

## Session Rule

At the end of every Codex or Claude session, update:

- `HANDOFF.md` with current state and next work.
- `PROJECT_LOG.md` with a dated summary.

Do not paste full chat transcripts into the repo.

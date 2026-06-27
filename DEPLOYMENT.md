# Harito Deployment Plan

## Recommended First Deployment

Use a Node hosting provider such as Render, Railway, Hostinger Node hosting, or a VPS. This repo includes:

- `Procfile` for platforms that detect process commands.
- `render.yaml` for Render-style deployment.
- `/api/health` for deployment health checks.

## Required Environment Variables

Copy `.env.example` into the platform environment settings. Minimum production values:

- `HARITO_ADMIN_TOKEN`: strong private admin token.
- `HARITO_WEBHOOK_SECRET`: strong private webhook secret.
- `HARITO_ENABLE_LIVE_PAYMENTS=false` until payment launch is approved.

## Production Blockers

- Replace local JSON order storage with a production database.
- Add real admin authentication before sharing `/admin`.
- Add legal shipping, return, refund, privacy, and terms pages.
- Confirm vendor catalog, commission, settlement, delivery, and return terms in writing.

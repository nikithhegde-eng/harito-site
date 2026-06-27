# Harito Project Progress

## What's Built

- Node backend in `server.js` with catalog, order creation, buyer order lookup, returns, admin analytics, automation queue, admin status update, payment config, admin session, and payment webhook routes.
- Buyer storefront now uses affiliate-style partner links instead of Harito payment collection.
- Admin dashboard at `http://localhost:4173/admin` with analytics, notifications, return requests, automation tasks, and admin-token unlock flow.
- Codex-Claude sync files: `CLAUDE.md`, `AGENTS.md`, `PROJECT_CONTEXT.md`, `HANDOFF.md`, `PROJECT_LOG.md`, and `SYNC_PROTOCOL.md`.

## Six Launch Assignments

- [x] GitHub/Codex/Claude sync workflow started.
- [x] Deployment scaffolding started with `Procfile`, `render.yaml`, `.env.example`, and `DEPLOYMENT.md`.
- [x] Database planning started with `DATABASE_SETUP.md` and `sql/harito-schema.sql`.
- [x] Admin access started with `HARITO_ADMIN_TOKEN` and admin session handling.
- [x] Payment gateway work paused; affiliate-link discovery is now the active storefront direction.
- [x] Vendor catalog onboarding started with `VENDOR_CATALOG_ONBOARDING.md` and `vendor-catalog-template.csv`.

## What's Next

- [ ] Choose deployment host and add environment variables.
- [ ] Move order storage from local JSON to managed Postgres.
- [ ] Add full auth provider before exposing admin publicly.
- [ ] Replace current partner URLs with approved affiliate links and tracking IDs.
- [ ] Replace sample catalog entries with vendor-approved catalog data or affiliate feeds.
- [ ] Add click/conversion analytics for affiliate links.

## How To Run Locally

```bash
npm start
```

Buyer site: `http://localhost:4173/`
Admin dashboard: `http://localhost:4173/admin`

## Repo

https://github.com/nikithhegde-eng/harito-site

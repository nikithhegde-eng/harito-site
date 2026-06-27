# Harito Project Progress

## What's Built

- Node backend in `server.js` with catalog, order creation, buyer order lookup, returns, admin analytics, automation queue, admin status update, payment config, admin session, and payment webhook routes.
- Buyer storefront with Harito cart and order flow instead of vendor-site redirects.
- Admin dashboard at `http://localhost:4173/admin` with analytics, notifications, return requests, automation tasks, and admin-token unlock flow.
- Codex-Claude sync files: `CLAUDE.md`, `AGENTS.md`, `PROJECT_CONTEXT.md`, `HANDOFF.md`, `PROJECT_LOG.md`, and `SYNC_PROTOCOL.md`.

## Six Launch Assignments

- [x] GitHub/Codex/Claude sync workflow started.
- [x] Deployment scaffolding started with `Procfile`, `render.yaml`, `.env.example`, and `DEPLOYMENT.md`.
- [x] Database planning started with `DATABASE_SETUP.md` and `sql/harito-schema.sql`.
- [x] Admin access started with `HARITO_ADMIN_TOKEN` and admin session handling.
- [x] Payment setup started with payment config status, webhook placeholder, `.env.example`, and `PAYMENT_SETUP.md`.
- [x] Vendor catalog onboarding started with `VENDOR_CATALOG_ONBOARDING.md` and `vendor-catalog-template.csv`.

## What's Next

- [ ] Choose deployment host and add environment variables.
- [ ] Move order storage from local JSON to managed Postgres.
- [ ] Add full auth provider before exposing admin publicly.
- [ ] Connect Razorpay or another payment gateway after vendor/legal approval.
- [ ] Replace sample catalog entries with vendor-approved catalog data.
- [ ] Add buyer email confirmation after order creation.

## How To Run Locally

```bash
npm start
```

Buyer site: `http://localhost:4173/`
Admin dashboard: `http://localhost:4173/admin`

## Repo

https://github.com/nikithhegde-eng/harito-site

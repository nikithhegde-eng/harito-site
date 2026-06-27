# Repository Guidelines

## Project Structure & Module Organization

Harito is an affiliate-first fashion discovery frontend with a local Node backend. Buyer pages live at the repo root: `index.html`, `advisor.html`, and legacy pages `cart.html`, `orders.html`, and `order-placed.html`. Frontend behavior is in `app.js`, `advisor.js`, and legacy checkout scripts. Backend APIs and static serving are in `server.js`. The admin dashboard lives in `admin-site/`. Shared product data is in `catalog.js`. Runtime order files under `data/*.json` are ignored and must not be committed.

## Build, Test, And Development Commands

Run locally with:

```bash
npm start
```

Open `http://localhost:4173/` for the buyer site and `http://localhost:4173/admin` for admin. For JavaScript syntax checks, run:

```bash
node --check server.js
node --check app.js
node --check cart.js
node --check orders.js
node --check admin-site/admin.js
```

## Coding Style & Naming Conventions

Use plain HTML, CSS, and JavaScript. Keep indentation at two spaces in HTML/CSS/JS. Use camelCase for JavaScript variables and functions. Keep copy professional and buyer-facing. Preserve the existing sharp Harito visual style and mobile responsiveness.

## Testing Guidelines

Before finishing storefront work, verify product cards open approved partner or affiliate links and images render from Unsplash. For backend or legacy checkout work, test `GET /api/health`, `GET /api/catalog`, buyer order lookup, and admin analytics. Clear any test order data from `data/*.json` before committing.

## Commit & Pull Request Guidelines

Use clear commit messages such as `Use affiliate product links` or `Update admin analytics`. Before committing, check `git status`, avoid unrelated files, and update `HANDOFF.md` plus `PROJECT_LOG.md` when work changes project state. Pull requests should describe what changed, how it was tested, and any remaining affiliate/vendor/legal blockers.

## Agent-Specific Instructions

Read `PROJECT_CONTEXT.md`, `HANDOFF.md`, and `SYNC_PROTOCOL.md` before editing. Keep the storefront affiliate-first unless Nikith explicitly restarts direct commerce. Do not commit raw chats, secrets, OTPs, customer data, payment details, or real order records.

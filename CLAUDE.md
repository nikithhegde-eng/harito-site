# Claude Code Instructions

## Project Context

Harito is a managed fashion commerce website. The buyer site lets shoppers browse products, add items to a Harito cart, create Harito order records, look up orders, and request returns. The admin site reads backend analytics for orders, payment status, vendor fulfillment, delivery, notifications, returns, and automation tasks.

Before making changes, read:

- `PROJECT_CONTEXT.md`
- `HANDOFF.md`
- `PROJECT_LOG.md`
- `SYNC_PROTOCOL.md`
- `BACKEND_SETUP.md`

## Run Locally

```bash
npm start
```

Buyer site: `http://localhost:4173/`
Admin dashboard: `http://localhost:4173/admin`

## Important Files

- `server.js`: Node backend and API routes.
- `catalog.js`: shared product catalog used by frontend and backend.
- `app.js`: homepage catalog filters and add-to-cart behavior.
- `cart.js`: checkout form and order creation.
- `orders.js`: buyer order lookup and return requests.
- `admin-site/admin.js`: admin analytics and automation queue.
- `BACKEND_SETUP.md`: backend setup and payment configuration notes.
- `VENDOR_TRACKER.md`: vendor communication status.
- `VENDOR_OUTREACH.md`: vendor email templates.

## Rules For Changes

- Keep the existing Harito visual style and mobile responsiveness.
- Do not reintroduce vendor-site checkout redirects.
- Do not collect live payments until a verified payment provider or UPI setup is configured.
- Do not commit real customer/order data. `data/*.json` is intentionally ignored.
- Do not commit raw Codex or Claude chats, OTPs, passwords, tokens, or payment details.
- Before editing, inspect nearby files and reuse existing styles/helpers.
- After changes, update `HANDOFF.md` and `PROJECT_LOG.md`, then summarize files changed, what changed, and how to test.

## Validation

Run syntax checks with Node when changing JavaScript:

```bash
node --check server.js
node --check app.js
node --check cart.js
node --check orders.js
node --check admin-site/admin.js
```

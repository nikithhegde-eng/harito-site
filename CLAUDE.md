# Claude Code Instructions

## Project Context

Harito is currently an affiliate-first fashion discovery website. The buyer site lets shoppers browse products, use the dressing advisor, and open approved partner or affiliate links. The older Harito cart/order backend remains in the repo for future direct-commerce work, but Razorpay, UPI, and direct payment collection are paused.

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
- `app.js`: homepage catalog filters, image switching, and affiliate-link actions.
- `cart.js`: legacy checkout form and order creation; keep dormant unless direct commerce is explicitly restarted.
- `orders.js`: legacy buyer order lookup and return requests.
- `admin-site/admin.js`: admin analytics and automation queue.
- `BACKEND_SETUP.md`: backend setup and payment configuration notes.
- `VENDOR_TRACKER.md`: vendor communication status.
- `VENDOR_OUTREACH.md`: vendor email templates.

## Rules For Changes

- Keep the existing Harito visual style and mobile responsiveness.
- Keep the storefront affiliate-first: product cards should open approved partner or affiliate links.
- Use free Unsplash fashion photos as preview visuals until official product image rights are approved.
- Do not invent affiliate tracking IDs.
- Do not proceed with Razorpay, UPI, or direct Harito payment work unless Nikith explicitly restarts direct commerce.
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

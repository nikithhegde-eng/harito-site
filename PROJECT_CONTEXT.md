# Harito Project Context

Harito is currently an affiliate-first fashion discovery website. The buyer site lets shoppers browse curated fashion products, use the AI dressing advisor, and open approved partner or affiliate product links. The older managed-checkout backend remains available for future work, but payment-gateway work is paused.

## Architecture

- `server.js`: local Node backend with API routes and static file serving.
- `catalog.js`: shared product catalog used by frontend and backend.
- `app.js`: homepage catalog rendering, filtering, image switching, and affiliate-link actions.
- `cart.js`: older cart state, checkout form, and order creation path; keep dormant unless direct commerce is approved.
- `orders.js`: older buyer order lookup and return request path.
- `admin-site/admin.js`: admin analytics, notifications, and automation queue.
- `data/*.json`: local runtime order and notification storage; ignored by Git.

## Run Locally

```bash
npm start
```

Buyer site: `http://localhost:4173/`
Admin dashboard: `http://localhost:4173/admin`

## Safety Rules

- Do not commit raw Codex or Claude chats.
- Do not commit OTPs, passwords, API keys, payment details, or real buyer/order data.
- Do not proceed with Razorpay, UPI, or direct Harito payment work unless Nikith explicitly reverses the affiliate-first direction.
- Use approved affiliate, reseller, marketplace, or brand partner links only; do not invent tracking IDs.
- Use Unsplash fashion photos as preview visuals until official product-image rights are confirmed.
- Summarize decisions and progress in `PROJECT_LOG.md` and `HANDOFF.md`.

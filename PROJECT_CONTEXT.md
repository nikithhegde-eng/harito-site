# Harito Project Context

Harito is a managed fashion commerce website. The buyer site lets shoppers browse curated fashion products, add items to a Harito cart, place Harito order records, look up orders, and request returns. The admin site reads backend analytics for order status, payment status, vendor fulfillment, delivery, notifications, returns, and automation tasks.

## Architecture

- `server.js`: local Node backend with API routes and static file serving.
- `catalog.js`: shared product catalog used by frontend and backend.
- `app.js`: homepage catalog rendering, filtering, image switching, and add-to-cart behavior.
- `cart.js`: cart state, checkout form, and order creation.
- `orders.js`: buyer order lookup and return requests.
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
- Do not reintroduce vendor-site checkout redirects.
- Do not enable live payment collection until a verified gateway or UPI setup is configured and vendor terms are confirmed.
- Summarize decisions and progress in `PROJECT_LOG.md` and `HANDOFF.md`.

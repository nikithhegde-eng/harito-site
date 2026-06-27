# Harito Backend Setup

## Run Locally

Start the Harito backend from this folder:

```bash
npm start
```

The site runs at `http://localhost:4173/` and the admin dashboard runs at `http://localhost:4173/admin`.

## What The Backend Handles

- Shared catalog API: `GET /api/catalog`
- Legacy buyer checkout: `POST /api/orders`
- Legacy buyer order lookup: `GET /api/orders?email=buyer@example.com`
- Legacy return request: `POST /api/returns`
- Admin analytics: `GET /api/admin/analytics`
- Admin order list: `GET /api/admin/orders`
- Admin status update: `PATCH /api/admin/orders/:orderId/status`
- Automation review: `POST /api/admin/automations/run`
- Payment webhook placeholder: `POST /api/payments/webhook`

Order and notification files are created locally under `data/` when the legacy order APIs run. Do not commit real order data.

The active storefront direction is affiliate-first: product cards should open approved partner or affiliate links, and the seller handles checkout, delivery, returns, and refunds.

## Payment Configuration

Payment gateway work is paused. Do not continue Razorpay, UPI, or direct Harito payment collection unless Nikith explicitly restarts direct commerce.

Legacy optional environment variables:

- `HARITO_UPI_ID`: creates a UPI intent for manual verification.
- `HARITO_ADMIN_TOKEN`: protects admin API routes.
- `HARITO_WEBHOOK_SECRET`: protects the payment webhook endpoint.
- `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`: prepare Razorpay integration.
- `DATABASE_URL`: production database connection placeholder.

Before any future direct-commerce launch, add legal shipping/return/refund pages and confirm vendor catalog, commission, settlement, fulfillment, and return terms.

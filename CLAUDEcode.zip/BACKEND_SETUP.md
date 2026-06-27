# Harito Backend Setup

## Run Locally

Start the Harito backend from this folder:

```bash
npm start
```

The site runs at `http://localhost:4173/` and the admin dashboard runs at `http://localhost:4173/admin`.

## What The Backend Handles

- Shared catalog API: `GET /api/catalog`
- Buyer checkout: `POST /api/orders`
- Buyer order lookup: `GET /api/orders?email=buyer@example.com`
- Return request: `POST /api/returns`
- Admin analytics: `GET /api/admin/analytics`
- Admin order list: `GET /api/admin/orders`
- Admin status update: `PATCH /api/admin/orders/:orderId/status`
- Automation review: `POST /api/admin/automations/run`
- Payment webhook placeholder: `POST /api/payments/webhook`

Orders are stored in `data/orders.json`. Notifications are stored in `data/notifications.json`.

## Payment Configuration

No live payment is collected unless payment configuration is added. Optional environment variables:

- `HARITO_UPI_ID`: creates a UPI intent for manual verification.
- `HARITO_ADMIN_TOKEN`: protects admin API routes.
- `HARITO_WEBHOOK_SECRET`: protects the payment webhook endpoint.

Before public launch, connect a verified payment gateway, add legal shipping/return/refund pages, and confirm vendor catalog, commission, settlement, fulfillment, and return terms.

# Harito Payment Setup

Payments are intentionally not live by default.

## Supported First Options

1. Manual UPI verification using `HARITO_UPI_ID`.
2. Razorpay setup using `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`.

Keep this disabled until launch approval:

```bash
HARITO_ENABLE_LIVE_PAYMENTS=false
```

## Before Turning Payments On

- Confirm vendor catalog usage rights.
- Confirm commission or margin per order.
- Confirm vendor payout timing.
- Confirm delivery ownership and return deductions.
- Publish shipping, return, refund, privacy, and terms pages.
- Set `HARITO_WEBHOOK_SECRET` and verify payment webhooks.

## Current Backend Behavior

- `/api/health` shows payment configuration status.
- `/api/payments/config` shows the active payment mode.
- Orders are created with payment status pending until verification or webhook update.
- `/api/payments/webhook` can mark an order paid when protected by `HARITO_WEBHOOK_SECRET`.

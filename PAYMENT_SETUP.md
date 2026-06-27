# Harito Payment Setup

Payments are intentionally not live. The active business direction is affiliate-first product discovery, where buyers leave Harito through approved partner links and complete checkout with the seller.

## Current Direction

- Do not proceed with Razorpay, UPI, or direct Harito payment collection.
- Use approved affiliate, reseller, marketplace, or brand partner links.
- Do not invent tracking IDs; replace current destination URLs only after approval.
- Use free Unsplash fashion photos as preview visuals until official product image rights are approved.

Keep live payment collection disabled:

```bash
HARITO_ENABLE_LIVE_PAYMENTS=false
```

## If Direct Commerce Is Restarted Later

- Confirm vendor catalog usage rights.
- Confirm commission or margin per order.
- Confirm vendor payout timing.
- Confirm delivery ownership and return deductions.
- Publish shipping, return, refund, privacy, and terms pages.
- Set `HARITO_WEBHOOK_SECRET` and verify payment webhooks.

## Legacy Backend Behavior

- `/api/health` shows payment configuration status.
- `/api/payments/config` shows the active payment mode.
- Orders are created with payment status pending until verification or webhook update.
- `/api/payments/webhook` can mark an order paid when protected by `HARITO_WEBHOOK_SECRET`.

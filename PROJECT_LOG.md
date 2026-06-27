# Harito Project Log

## 2026-06-27

- Added managed commerce backend for catalog, checkout order records, buyer order lookup, returns, admin analytics, automation tasks, admin status updates, and payment webhook placeholder.
- Updated the storefront to keep shoppers inside Harito cart/checkout instead of redirecting to vendor websites.
- Added `CLAUDE.md`, `PROJECT_CONTEXT.md`, `HANDOFF.md`, and `SYNC_PROTOCOL.md` so Codex and Claude can share project context through GitHub without storing raw chats.
- Added privacy rules to avoid committing raw chat exports, secrets, OTPs, payment data, or real buyer order data.
- Started the six launch assignments: restored `server.js`, added deployment scaffolding, `.env.example`, database setup notes and SQL schema, payment setup notes, vendor catalog onboarding template, and admin token login flow.
- Verified `/api/health`, `/api/payments/config`, admin session behavior, protected admin mode, and `npm run check`.
- 2026-06-28: Paused Razorpay/UPI/direct-payment direction, shifted the storefront to affiliate-style partner links, kept Unsplash fashion photos as preview catalog visuals, and updated handoff docs to prevent payment-gateway work from continuing by default.

# Harito Commerce Operations Plan

## Goal

Move Harito from fashion discovery to managed checkout only after vendor approvals are in place. Do not accept customer payments for vendor products until catalog rights, payment settlement, commission, fulfillment, returns, and support ownership are agreed in writing.

## Vendor Data Needed

- SKU, product title, description, category, gender, colour, size chart, images, MRP, selling price, discount, tax/HSN, stock status, and product URL.
- Update method: CSV, Google Sheet, API, Shopify feed, manual upload, or email.
- Update frequency: real-time, daily, weekly, or campaign-based.
- Usage permissions for images, logos, product descriptions, discounts, and AI styling recommendations.

## Commercial Terms

- Commission or margin per order.
- Who collects payment: Harito, vendor, marketplace, or split-payment provider.
- Vendor payout timing: prepaid, weekly, post-delivery, or after return window closes.
- Cancellation, return, RTO, refund, and damaged-item deductions.
- Invoice format, GST/tax handling, and settlement reports.

## Fulfillment Options

1. Vendor direct shipping: vendor packs, ships, shares tracking, and handles returns.
2. Harito courier pickup: Harito books courier pickup from vendor address and updates customer tracking.
3. Hybrid model: large vendors ship directly; small vendors use Harito courier pickup.

For launch, vendor direct shipping is operationally simplest. Harito should only coordinate delivery after vendor pickup address, packaging standard, shipping SLA, and return pickup process are documented.

## Website Changes Needed

- Product table with vendor approval status and stock source.
- Checkout disabled unless `vendorApproved`, `catalogApproved`, and `paymentTermsApproved` are true.
- Order record fields: order ID, buyer details, product SKU, vendor, payment ID, vendor payout status, shipment tracking, return status.
- Admin dashboard for order status, vendor payout, courier tracking, and refund notes.
- Customer-facing policy pages for shipping, returns, refunds, cancellation, and contact support.

## Immediate Next Steps

1. Send managed-commerce vendor template to active warm leads.
2. Ask each vendor for catalog format and commercial terms.
3. Choose whether launch model is vendor direct shipping or Harito courier pickup.
4. Add backend order storage before enabling real checkout.
5. Add payment gateway only after legal policy pages and vendor agreements are ready.

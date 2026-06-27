# Harito Database Setup

The current backend uses local JSON files for development. Before real customers, move orders, notifications, returns, payment records, vendor settlements, and delivery tracking to a managed database.

## Recommended Database

Use Supabase Postgres, Neon Postgres, Railway Postgres, or Render Postgres. Set:

```bash
DATABASE_URL=postgres://...
```

The current `/api/health` endpoint reports whether `DATABASE_URL` is present. The storage adapter still needs to be switched from local JSON to database writes before launch.

## Tables Needed

Use `sql/harito-schema.sql` as the first schema draft. Core tables:

- `orders`
- `order_items`
- `notifications`
- `return_requests`
- `vendor_settlements`
- `payment_events`
- `delivery_events`

## Launch Rule

Do not accept live orders from public customers until database storage is active and tested with backups.

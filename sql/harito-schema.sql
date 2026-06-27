create table if not exists orders (
  id text primary key,
  created_at timestamptz not null,
  updated_at timestamptz not null,
  status text not null,
  buyer_name text not null,
  buyer_email text not null,
  buyer_phone text not null,
  shipping_address jsonb not null,
  totals jsonb not null,
  payment jsonb not null,
  vendor jsonb not null,
  delivery jsonb not null
);

create table if not exists order_items (
  id bigserial primary key,
  order_id text not null references orders(id) on delete cascade,
  product_id text not null,
  sku text not null,
  name text not null,
  brand text not null,
  vendor text not null,
  category text not null,
  color text not null,
  size text not null,
  quantity integer not null,
  unit_price integer not null,
  mrp integer not null,
  line_total integer not null,
  image text
);

create table if not exists notifications (
  id text primary key,
  created_at timestamptz not null,
  type text not null,
  title text not null,
  body text not null,
  order_id text,
  read boolean not null default false
);

create table if not exists return_requests (
  id bigserial primary key,
  order_id text not null references orders(id) on delete cascade,
  buyer_email text not null,
  reason text not null,
  status text not null default 'open',
  created_at timestamptz not null
);

create table if not exists vendor_settlements (
  id bigserial primary key,
  order_id text not null references orders(id) on delete cascade,
  vendor text not null,
  commission_rate numeric(5, 2),
  payable_amount integer,
  status text not null default 'terms_pending',
  notes text
);

create table if not exists payment_events (
  id bigserial primary key,
  order_id text not null references orders(id) on delete cascade,
  provider text not null,
  payment_id text,
  status text not null,
  payload jsonb,
  created_at timestamptz not null
);

create table if not exists delivery_events (
  id bigserial primary key,
  order_id text not null references orders(id) on delete cascade,
  partner text,
  tracking_number text,
  tracking_url text,
  status text not null,
  payload jsonb,
  created_at timestamptz not null
);

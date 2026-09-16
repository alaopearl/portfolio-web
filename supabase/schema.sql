create table if not exists public.service_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  whatsapp text,
  service text not null,
  budget text,
  timeline text,
  message text not null,
  file_name text,
  type text not null check (type in ('service', 'quote')),
  status text not null default 'New' check (status in ('New', 'In Progress', 'Contacted', 'Closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.service_requests enable row level security;
alter table public.contact_messages enable row level security;

create policy "public can submit service requests"
  on public.service_requests for insert to anon, authenticated with check (true);
create policy "public can submit contact messages"
  on public.contact_messages for insert to anon, authenticated with check (true);
create policy "admins can manage service requests"
  on public.service_requests for all to authenticated using (true) with check (true);
create policy "admins can manage contact messages"
  on public.contact_messages for all to authenticated using (true) with check (true);

create table if not exists public.nin_services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  price text not null default 'Contact for pricing',
  enabled boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.nin_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  whatsapp text,
  email text not null,
  service text not null,
  preferred_date date,
  method text not null check (method in ('Virtual', 'Physical')),
  notes text,
  status text not null default 'New' check (status in ('New', 'Contacted', 'Appointment Scheduled', 'Processing', 'Completed', 'Cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand text,
  category text not null,
  network_type text,
  key_specification text,
  price text,
  stock_quantity integer not null default 0,
  availability text not null default 'Out of Stock',
  image_url text,
  description text,
  specifications jsonb not null default '[]'::jsonb,
  warranty text,
  delivery_information text,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.product_orders (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  whatsapp text,
  email text not null,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  quantity integer not null check (quantity > 0),
  delivery_method text not null check (delivery_method in ('Pickup', 'Delivery')),
  delivery_address text,
  instructions text,
  status text not null default 'New' check (status in ('New', 'Contacted', 'Completed', 'Cancelled')),
  created_at timestamptz not null default now()
);

alter table public.nin_services enable row level security;
alter table public.nin_requests enable row level security;
alter table public.products enable row level security;
alter table public.product_orders enable row level security;

create policy "public can view enabled nin services" on public.nin_services for select to anon, authenticated using (enabled = true);
create policy "admins can manage nin services" on public.nin_services for all to authenticated using (true) with check (true);
create policy "public can submit nin requests" on public.nin_requests for insert to anon, authenticated with check (true);
create policy "admins can manage nin requests" on public.nin_requests for all to authenticated using (true) with check (true);
create policy "public can view products" on public.products for select to anon, authenticated using (true);
create policy "admins can manage products" on public.products for all to authenticated using (true) with check (true);
create policy "public can submit product orders" on public.product_orders for insert to anon, authenticated with check (true);
create policy "admins can manage product orders" on public.product_orders for all to authenticated using (true) with check (true);
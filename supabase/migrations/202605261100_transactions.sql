-- Simple transaction records for products marked as sold.

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  seller_id uuid not null references public.profiles (id) on delete cascade,
  buyer_id uuid references public.profiles (id) on delete set null,
  final_price numeric not null default 0,
  status text not null default 'completed',
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.transactions
add column if not exists product_id uuid references public.products (id) on delete cascade;

alter table public.transactions
add column if not exists seller_id uuid references public.profiles (id) on delete cascade;

alter table public.transactions
add column if not exists buyer_id uuid references public.profiles (id) on delete set null;

alter table public.transactions
add column if not exists final_price numeric not null default 0;

alter table public.transactions
add column if not exists status text not null default 'completed';

alter table public.transactions
add column if not exists completed_at timestamptz;

alter table public.transactions
add column if not exists created_at timestamptz not null default now();

alter table public.transactions
add column if not exists updated_at timestamptz not null default now();

delete from public.transactions
where product_id is null or seller_id is null;

delete from public.transactions a
using public.transactions b
where
  a.ctid < b.ctid
  and a.product_id = b.product_id;

alter table public.transactions
alter column product_id set not null;

alter table public.transactions
alter column seller_id set not null;

alter table public.transactions
drop constraint if exists transactions_product_unique;

alter table public.transactions
add constraint transactions_product_unique unique (product_id);

alter table public.transactions
drop constraint if exists transactions_status_check;

alter table public.transactions
add constraint transactions_status_check
check (status in ('completed', 'cancelled'));

alter table public.transactions enable row level security;

drop policy if exists "Sellers can read their product transactions" on public.transactions;
create policy "Sellers can read their product transactions"
on public.transactions
for select
to authenticated
using (seller_id = auth.uid() or buyer_id = auth.uid());

drop policy if exists "Sellers can create their product transactions" on public.transactions;
create policy "Sellers can create their product transactions"
on public.transactions
for insert
to authenticated
with check (seller_id = auth.uid());

drop policy if exists "Sellers can update their product transactions" on public.transactions;
create policy "Sellers can update their product transactions"
on public.transactions
for update
to authenticated
using (seller_id = auth.uid())
with check (seller_id = auth.uid());

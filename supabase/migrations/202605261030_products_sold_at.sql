-- Required for marking a seller's product as sold.

alter table public.products
add column if not exists sold_at timestamptz;

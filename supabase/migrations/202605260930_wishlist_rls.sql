-- RLS and uniqueness rules for user wishlists.

delete from public.wishlists
where user_id is null or product_id is null;

delete from public.wishlists a
using public.wishlists b
where
  a.ctid < b.ctid
  and a.user_id = b.user_id
  and a.product_id = b.product_id;

alter table public.wishlists
alter column user_id set not null;

alter table public.wishlists
alter column product_id set not null;

alter table public.wishlists enable row level security;

alter table public.wishlists
drop constraint if exists wishlists_user_product_unique;

alter table public.wishlists
add constraint wishlists_user_product_unique unique (user_id, product_id);

drop policy if exists "Users can read their own wishlists" on public.wishlists;
create policy "Users can read their own wishlists"
on public.wishlists
for select
to authenticated
using (user_id::text = auth.uid()::text);

drop policy if exists "Users can create their own wishlists" on public.wishlists;
create policy "Users can create their own wishlists"
on public.wishlists
for insert
to authenticated
with check (user_id::text = auth.uid()::text);

drop policy if exists "Users can delete their own wishlists" on public.wishlists;
create policy "Users can delete their own wishlists"
on public.wishlists
for delete
to authenticated
using (user_id::text = auth.uid()::text);

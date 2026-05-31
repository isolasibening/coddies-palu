-- Saved searches let authenticated users save catalog filters for later.

create table if not exists public.saved_searches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  keyword text not null default '',
  category_id text,
  location text,
  max_price numeric,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.saved_searches
add column if not exists user_id uuid references public.profiles (id) on delete cascade;

alter table public.saved_searches
add column if not exists keyword text not null default '';

alter table public.saved_searches
add column if not exists category_id text;

alter table public.saved_searches
add column if not exists location text;

alter table public.saved_searches
add column if not exists max_price numeric;

alter table public.saved_searches
add column if not exists created_at timestamptz not null default now();

alter table public.saved_searches
add column if not exists updated_at timestamptz not null default now();

delete from public.saved_searches
where user_id is null;

alter table public.saved_searches
alter column user_id set not null;

alter table public.saved_searches enable row level security;

drop policy if exists "Users can read their own saved searches" on public.saved_searches;
create policy "Users can read their own saved searches"
on public.saved_searches
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Users can create their own saved searches" on public.saved_searches;
create policy "Users can create their own saved searches"
on public.saved_searches
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "Users can delete their own saved searches" on public.saved_searches;
create policy "Users can delete their own saved searches"
on public.saved_searches
for delete
to authenticated
using (user_id = auth.uid());

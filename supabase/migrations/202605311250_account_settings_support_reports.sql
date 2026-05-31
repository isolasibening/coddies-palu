-- Support reports for Coddies MVP.

create table if not exists public.support_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  type text not null,
  title text not null,
  description text not null,
  contact text,
  status text not null default 'open',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.support_reports enable row level security;

drop policy if exists "Users can create support reports" on public.support_reports;
create policy "Users can create support reports"
on public.support_reports
for insert
to anon, authenticated
with check (user_id is null or user_id = auth.uid());

drop policy if exists "Users can read their own support reports" on public.support_reports;
create policy "Users can read their own support reports"
on public.support_reports
for select
to authenticated
using (user_id = auth.uid());

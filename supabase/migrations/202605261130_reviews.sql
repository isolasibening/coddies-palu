-- Simple reviews for completed product transactions.

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  transaction_id uuid not null references public.transactions (id) on delete cascade,
  reviewer_id uuid not null references public.profiles (id) on delete cascade,
  reviewed_user_id uuid not null references public.profiles (id) on delete cascade,
  product_accuracy_rating integer not null,
  hygiene_rating integer not null,
  communication_rating integer not null,
  safety_rating integer not null,
  comment text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.reviews
add column if not exists transaction_id uuid references public.transactions (id) on delete cascade;

alter table public.reviews
add column if not exists reviewer_id uuid references public.profiles (id) on delete cascade;

alter table public.reviews
add column if not exists reviewed_user_id uuid references public.profiles (id) on delete cascade;

alter table public.reviews
add column if not exists product_accuracy_rating integer;

alter table public.reviews
add column if not exists hygiene_rating integer;

alter table public.reviews
add column if not exists communication_rating integer;

alter table public.reviews
add column if not exists safety_rating integer;

alter table public.reviews
add column if not exists comment text not null default '';

alter table public.reviews
add column if not exists created_at timestamptz not null default now();

alter table public.reviews
add column if not exists updated_at timestamptz not null default now();

delete from public.reviews
where
  transaction_id is null
  or reviewer_id is null
  or reviewed_user_id is null
  or product_accuracy_rating is null
  or hygiene_rating is null
  or communication_rating is null
  or safety_rating is null;

delete from public.reviews a
using public.reviews b
where
  a.ctid < b.ctid
  and a.transaction_id = b.transaction_id
  and a.reviewer_id = b.reviewer_id;

alter table public.reviews
alter column transaction_id set not null;

alter table public.reviews
alter column reviewer_id set not null;

alter table public.reviews
alter column reviewed_user_id set not null;

alter table public.reviews
alter column product_accuracy_rating set not null;

alter table public.reviews
alter column hygiene_rating set not null;

alter table public.reviews
alter column communication_rating set not null;

alter table public.reviews
alter column safety_rating set not null;

alter table public.reviews
drop constraint if exists reviews_transaction_reviewer_unique;

alter table public.reviews
add constraint reviews_transaction_reviewer_unique
unique (transaction_id, reviewer_id);

alter table public.reviews
drop constraint if exists reviews_rating_range_check;

alter table public.reviews
add constraint reviews_rating_range_check
check (
  product_accuracy_rating between 1 and 5
  and hygiene_rating between 1 and 5
  and communication_rating between 1 and 5
  and safety_rating between 1 and 5
);

alter table public.reviews
drop constraint if exists reviews_no_self_review_check;

alter table public.reviews
add constraint reviews_no_self_review_check
check (reviewer_id <> reviewed_user_id);

alter table public.reviews enable row level security;

drop policy if exists "Reviews are publicly readable" on public.reviews;
create policy "Reviews are publicly readable"
on public.reviews
for select
using (true);

drop policy if exists "Users can create their own reviews" on public.reviews;
create policy "Users can create their own reviews"
on public.reviews
for insert
to authenticated
with check (reviewer_id = auth.uid() and reviewer_id <> reviewed_user_id);

drop policy if exists "Users can update their own reviews" on public.reviews;
create policy "Users can update their own reviews"
on public.reviews
for update
to authenticated
using (reviewer_id = auth.uid())
with check (reviewer_id = auth.uid() and reviewer_id <> reviewed_user_id);

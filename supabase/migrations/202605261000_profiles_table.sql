-- Ensures Account reads from public.profiles, including projects that already
-- ran the older users-based profile trigger.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null default '',
  email text not null default '',
  phone text not null default '',
  location text not null default '',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

do $$
begin
  if to_regclass('public.users') is not null then
    execute $copy_users$
      insert into public.profiles (
        id,
        name,
        email,
        phone,
        location,
        avatar_url,
        created_at,
        updated_at
      )
      select
        (to_jsonb(users_row) ->> 'id')::uuid,
        coalesce(to_jsonb(users_row) ->> 'name', ''),
        coalesce(to_jsonb(users_row) ->> 'email', ''),
        coalesce(to_jsonb(users_row) ->> 'phone', ''),
        coalesce(to_jsonb(users_row) ->> 'location', ''),
        coalesce(
          to_jsonb(users_row) ->> 'avatar_url',
          to_jsonb(users_row) ->> 'avatarUrl'
        ),
        coalesce(
          nullif(to_jsonb(users_row) ->> 'created_at', '')::timestamptz,
          nullif(to_jsonb(users_row) ->> 'createdAt', '')::timestamptz,
          now()
        ),
        coalesce(
          nullif(to_jsonb(users_row) ->> 'updated_at', '')::timestamptz,
          nullif(to_jsonb(users_row) ->> 'updatedAt', '')::timestamptz,
          now()
        )
      from public.users users_row
      on conflict (id) do update
      set
        name = excluded.name,
        email = excluded.email,
        phone = excluded.phone,
        location = excluded.location,
        avatar_url = excluded.avatar_url,
        updated_at = now()
    $copy_users$;
  end if;
end;
$$;

alter table public.profiles enable row level security;

drop policy if exists "Profiles are publicly readable" on public.profiles;
create policy "Profiles are publicly readable"
on public.profiles
for select
using (true);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
on public.profiles
for insert
to authenticated
with check (id = auth.uid());

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    name,
    email,
    phone,
    location,
    avatar_url,
    created_at,
    updated_at
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', ''),
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'phone', ''),
    coalesce(new.raw_user_meta_data ->> 'location', ''),
    null,
    now(),
    now()
  )
  on conflict (id) do update
  set
    name = excluded.name,
    email = excluded.email,
    phone = excluded.phone,
    location = excluded.location,
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_auth_user();

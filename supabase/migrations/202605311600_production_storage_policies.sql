-- Production-safe public buckets and RLS policies for uploads used by Coddies.

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'product-photos',
  'product-photos',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do update
set public = excluded.public;

drop policy if exists "Product photos are publicly readable" on storage.objects;
create policy "Product photos are publicly readable"
on storage.objects
for select
using (bucket_id = 'product-photos');

drop policy if exists "Authenticated users can upload product photos" on storage.objects;
create policy "Authenticated users can upload product photos"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'product-photos'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Users can delete their own product photos" on storage.objects;
create policy "Users can delete their own product photos"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'product-photos'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Profile avatars are publicly readable" on storage.objects;
create policy "Profile avatars are publicly readable"
on storage.objects
for select
using (bucket_id = 'avatars');

drop policy if exists "Users can upload their own profile avatars" on storage.objects;
create policy "Users can upload their own profile avatars"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Users can update their own profile avatars" on storage.objects;
create policy "Users can update their own profile avatars"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Users can delete their own profile avatars" on storage.objects;
create policy "Users can delete their own profile avatars"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

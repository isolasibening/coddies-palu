-- Storage and basic RLS policies needed for authenticated users to create
-- product listings with photos.

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
with check (bucket_id = 'product-photos' and owner = auth.uid());

drop policy if exists "Users can delete their own product photos" on storage.objects;
create policy "Users can delete their own product photos"
on storage.objects
for delete
to authenticated
using (bucket_id = 'product-photos' and owner = auth.uid());

alter table public.products enable row level security;

drop policy if exists "Products are publicly readable" on public.products;
create policy "Products are publicly readable"
on public.products
for select
using (true);

drop policy if exists "Users can create their own products" on public.products;
create policy "Users can create their own products"
on public.products
for insert
to authenticated
with check (seller_id::text = auth.uid()::text);

drop policy if exists "Users can update their own products" on public.products;
create policy "Users can update their own products"
on public.products
for update
to authenticated
using (seller_id::text = auth.uid()::text)
with check (seller_id::text = auth.uid()::text);

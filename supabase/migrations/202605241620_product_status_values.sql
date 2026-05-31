-- Keep product status values consistent with the application lifecycle keys.
-- Legacy Indonesian labels are normalized before the check constraint is added.

alter table public.products
drop constraint if exists products_status_check;

update public.products
set status = case lower(btrim(coalesce(status, '')))
  when 'available' then 'available'
  when 'tersedia' then 'available'
  when 'negotiating' then 'negotiating'
  when 'sedang dinego' then 'negotiating'
  when 'booked' then 'booked'
  when 'booking' then 'booked'
  when 'sold' then 'sold'
  when 'terjual' then 'sold'
  when 'cancelled' then 'cancelled'
  when 'dibatalkan' then 'cancelled'
  else 'available'
end;

alter table public.products
alter column status set default 'available';

alter table public.products
alter column status set not null;

alter table public.products
add constraint products_status_check
check (
  status in (
    'available',
    'negotiating',
    'booked',
    'sold',
    'cancelled'
  )
);

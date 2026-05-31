-- Product detail and review creation need to resolve the completed transaction
-- for a sold product. Buyer data is still minimal in MVP and may be null.

drop policy if exists "Completed transactions are readable for reviews" on public.transactions;
create policy "Completed transactions are readable for reviews"
on public.transactions
for select
using (status = 'completed');

create table public.invoices (
  id uuid not null default gen_random_uuid (),
  invoice_number text null,
  invoice_date text null,
  due_date text null,
  vendor_name text null,
  customer_name text null,
  subtotal text null,
  tax_amount text null,
  total_amount text null,
  status text null,
  gmail text null,
  created_at timestamp with time zone null default now(),
  constraint invoices_pkey primary key (id)
) TABLESPACE pg_default;

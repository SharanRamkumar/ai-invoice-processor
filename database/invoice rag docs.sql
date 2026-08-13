create table public.invoice_docs (
  id uuid not null default gen_random_uuid (),
  content text not null,
  metadata jsonb null,
  embedding public.vector null,
  created_at timestamp with time zone null default now(),
  constraint invoice_docs_pkey primary key (id)
) TABLESPACE pg_default;

CREATE OR REPLACE FUNCTION public.match_documents(
    filter jsonb,
    match_count integer,
    query_embedding vector
)
RETURNS TABLE (
    id uuid,
    content text,
    metadata jsonb,
    similarity double precision
)
LANGUAGE sql
AS $$
    SELECT
        d.id,
        d.content,
        d.metadata,
        1 - (d.embedding <=> query_embedding) AS similarity
    FROM public.invoice_docs AS d
    WHERE 1 - (d.embedding <=> query_embedding) > 0
    ORDER BY d.embedding <=> query_embedding
    LIMIT match_count;
$$;

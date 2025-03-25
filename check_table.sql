SELECT 
    table_name,
    column_name, 
    data_type, 
    column_default,
    is_nullable,
    CASE 
        WHEN constraint_type = 'PRIMARY KEY' THEN 'PK'
        ELSE ''
    END as key_type
FROM information_schema.columns c
LEFT JOIN information_schema.key_column_usage k 
    ON c.column_name = k.column_name 
    AND c.table_name = k.table_name
LEFT JOIN information_schema.table_constraints tc
    ON k.constraint_name = tc.constraint_name
WHERE c.table_schema = 'public'
AND c.table_name IN ('faqs', 'services', 'customer')
ORDER BY table_name, column_name;
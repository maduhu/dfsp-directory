DO
$do$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM directory.enduser WHERE "endUserNumber" = '00359######') THEN
        INSERT INTO directory.enduser("endUserNumber", name) VALUES ('00359######', 'Test');
    END IF;
END
$do$

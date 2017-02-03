DO
$do$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM directory.enduser WHERE "endUserNumber" = '00359######') THEN
        INSERT INTO directory.enduser("endUserNumber", "firstName", "lastName", "dob", "nationalId") VALUES ('00359######', 'Test', 'Test', '10/12/1999', '123654789');
    END IF;
END
$do$

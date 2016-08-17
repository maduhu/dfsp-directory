CREATE OR REPLACE FUNCTION directory."user.get"(IN "userNumber" text)
RETURNS
    TABLE(name text) AS
$BODY$
    SELECT name FROM directory.enduser WHERE endUserNumber ="userNumber"
$BODY$
LANGUAGE SQL
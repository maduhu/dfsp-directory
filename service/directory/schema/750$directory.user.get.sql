CREATE OR REPLACE FUNCTION directory."user.get"(
    "@userNumber" text
)
RETURNS
    TABLE(name text) AS
$BODY$
    SELECT name FROM directory.endUser WHERE "endUserNumber" ="@userNumber"
$BODY$
LANGUAGE SQL

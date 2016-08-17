CREATE OR REPLACE FUNCTION directory."user.test"(
    IN param1 text,
    IN param2 text)
RETURNS
    TABLE(name text, value text) AS
$BODY$
    SELECT
        'param1' as name,
        param1 as value
    UNION ALL
    SELECT
        'param2' as name,
        param2 as value
$BODY$
LANGUAGE SQL
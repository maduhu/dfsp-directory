CREATE OR REPLACE FUNCTION directory."user.get"(
    "@userNumber" text
)
RETURNS TABLE(
    "name" text,
    "isSingleResult" boolean
) AS
$BODY$
    SELECT
        "name",
        true AS "isSingleResult"
    FROM
        directory.endUser
    WHERE
        "endUserNumber" ="@userNumber"
$BODY$
LANGUAGE SQL

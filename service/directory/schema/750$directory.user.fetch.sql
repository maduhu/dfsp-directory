CREATE OR REPLACE FUNCTION directory."user.fetch"(
    "@actorId" int[]
)
RETURNS TABLE(
    "name" text,
    "actorId" int,
    "endUserNumber" varchar(20)
) AS
$BODY$
    SELECT
        "name",
        "actorId",
        "endUserNumber"
    FROM
        directory.endUser
    WHERE
        "actorId" IN (SELECT UNNEST("@actorId"))
$BODY$
LANGUAGE SQL

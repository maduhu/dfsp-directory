CREATE OR REPLACE FUNCTION directory."user.get"(
    "@userNumber" text,
    "@actorId" int
)
RETURNS TABLE(
    "name" text,
    "endUserNumber" varchar(20),
    "isSingleResult" boolean
) AS
$BODY$
    SELECT
        "name",
        "endUserNumber",
        true AS "isSingleResult"
    FROM
        directory.endUser
    WHERE
        ("endUserNumber" = "@userNumber" OR "actorId" = "@actorId")
$BODY$
LANGUAGE SQL

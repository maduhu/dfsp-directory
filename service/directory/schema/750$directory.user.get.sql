CREATE OR REPLACE FUNCTION directory."user.get"(
    "@userNumber" text,
    "@actorId" int
)
RETURNS TABLE(
    "name" text,
    "actorId" int,
    "endUserNumber" varchar(20),
    "isSingleResult" boolean
) AS
$BODY$
    SELECT
        "name",
        "actorId",
        "endUserNumber",
        true AS "isSingleResult"
    FROM
        directory.endUser
    WHERE
        ("endUserNumber" = "@userNumber" OR "actorId" = "@actorId")
$BODY$
LANGUAGE SQL

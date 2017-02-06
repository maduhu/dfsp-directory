CREATE OR REPLACE FUNCTION directory."user.get"(
    "@userNumber" text,
    "@actorId" int
)
RETURNS TABLE(
    "firstName" varchar(255),
    "lastName" varchar(255),
    "actorId" int,
    "dob" date,
    "nationalId" varchar(255),
    "endUserNumber" varchar(20),
    "isSingleResult" boolean
) AS
$BODY$
    SELECT
        "firstName",
        "lastName",
        "actorId",
        "dob",
        "nationalId",
        "endUserNumber",
        true AS "isSingleResult"
    FROM
        directory.endUser
    WHERE
        ("endUserNumber" = "@userNumber" OR "actorId" = "@actorId")
$BODY$
LANGUAGE SQL

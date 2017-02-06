CREATE OR REPLACE FUNCTION directory."user.fetch"(
    "@actorId" int[]
)
RETURNS TABLE(
    "firstName" varchar(255),
    "lastName" varchar(255),
    "actorId" int,
    "dob" date,
    "nationalId" varchar(255),
    "endUserNumber" varchar(20)
) AS
$BODY$
    SELECT
        "firstName",
        "lastName",
        "actorId",
        "dob",
        "nationalId",
        "endUserNumber"
    FROM
        directory.endUser
    WHERE
        "actorId" IN (SELECT UNNEST("@actorId"))
$BODY$
LANGUAGE SQL

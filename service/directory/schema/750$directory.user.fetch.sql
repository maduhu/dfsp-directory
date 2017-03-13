CREATE OR REPLACE FUNCTION directory."user.fetch"(
    "@actorId" int[]
)
RETURNS TABLE(
    "firstName" varchar(255),
    "lastName" varchar(255),
    "actorId" int,
    "dob" date,
    "nationalId" varchar(255),
    "identifiers" json
) AS
$BODY$
    SELECT
        u."firstName",
        u."lastName",
        u."actorId",
        u."dob",
        u."nationalId",
        (
            SELECT row_to_json(identifiers)
            FROM (
                SELECT 
                    i."identifier", i."identifierTypeCode"
                 FROM
                    directory."identifier" i
                WHERE
                    i."actorId" = u."actorId"
                ) identifiers
        ) as "identifiers"
    FROM
        directory.user as u
    WHERE
        "actorId" IN (SELECT UNNEST("@actorId"))
$BODY$
LANGUAGE SQL

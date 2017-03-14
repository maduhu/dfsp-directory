CREATE OR REPLACE FUNCTION directory."user.get"(
    "@identifier" VARCHAR(256),
    "@identifierTypeCode" VARCHAR(3),
    "@actorId" int
)
RETURNS TABLE(
    "firstName" varchar(255),
    "lastName" varchar(255),
    "actorId" int,
    "dob" date,
    "nationalId" varchar(255),
    "identifiers" json,
    "isSingleResult" boolean
) AS
$BODY$
BEGIN
    IF "@actorId" IS NULL AND "@identifier" IS NULL THEN
        RAISE EXCEPTION 'directory.missingArguments';
    END IF;
    IF "@identifierTypeCode" IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM directory."identifierType" AS dit WHERE dit."code" = "@identifierTypeCode") THEN
            RAISE EXCEPTION 'directory.identifierTypeCodeNotFound';
        END IF;
     END IF;

RETURN QUERY
    SELECT
        u."firstName",
        u."lastName",
        u."actorId",
        u."dob",
        u."nationalId",
        (
            SELECT row_to_json(x)
            FROM (
                SELECT 
                    i."identifier", i."identifierTypeCode"
                 FROM
                    directory."identifier" i
                WHERE
                    i."actorId" = u."actorId"
                ) x
        ) as "identifiers",
        true AS "isSingleResult"
    FROM
        directory.user u
    JOIN
        directory.identifier di ON di."actorId" = u."actorId"
    WHERE
        di."identifier" = "@identifier" OR di."identifierTypeCode" = "@identifierTypeCode" OR u."actorId" = "@actorId"
    GROUP BY
        u."actorId"
    LIMIT 1;
END;
$BODY$
LANGUAGE plpgsql

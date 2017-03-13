CREATE OR REPLACE FUNCTION directory."user.add"(
    "@identifier" VARCHAR(256),
    "@identifierTypeCode" VARCHAR(3),
    "@firstName" VARCHAR(255),
    "@lastName" VARCHAR(255),
    "@dob" DATE,
    "@nationalId" VARCHAR(255)
)
RETURNS TABLE(
    "actorId" INTEGER,
    "@identifier" VARCHAR(20),
    "@identifierTypeCode" VARCHAR(3),
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "dob" DATE,
    "nationalId" VARCHAR(255),
    "isSingleResult" BOOLEAN
) AS
$BODY$
    WITH u as (
        INSERT INTO directory.user ("firstName", "lastName", "dob", "nationalId")
        VALUES ("@userNumber", "@firstName", "@lastName", "@dob", "@nationalId")
        RETURNING *
    )

    INSERT INTO directory.identifier ("identifier", "actorId", "identifierTypeCode")
    VALUES ("@identifier", u."actorId", "@lastName", "@identifierTypeCode")

    SELECT
        *,
        "@identifier" as "identifier",
        "@identifierTypeCode" as "identifierTypeCode"
        true AS "isSingleResult"
    FROM u
$BODY$
LANGUAGE SQL

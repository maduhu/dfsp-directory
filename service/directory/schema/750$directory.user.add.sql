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
    "identifier" VARCHAR(20),
    "identifierTypeCode" VARCHAR(3),
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "dob" DATE,
    "nationalId" VARCHAR(255),
    "isSingleResult" BOOLEAN
) AS
$BODY$
    WITH u as (
        INSERT INTO directory.user ("firstName", "lastName", "dob", "nationalId")
        VALUES ("@firstName", "@lastName", "@dob", "@nationalId")
        RETURNING *
    ),
    i as (
        INSERT INTO directory.identifier ("identifier", "actorId", "identifierTypeCode")
        VALUES (
                "@identifier", 
                (
                    SELECT 
                        u."actorId" 
                    FROM 
                        u
                ), 
                "@identifierTypeCode")
        RETURNING *
    )
    SELECT
        u."actorId",
        "@identifier" as "identifier",
        "@identifierTypeCode" as "identifierTypeCode",
        u."firstName",
        u."lastName",
        u."dob",
        u."nationalId",
        true AS "isSingleResult"
    FROM u
$BODY$
LANGUAGE SQL

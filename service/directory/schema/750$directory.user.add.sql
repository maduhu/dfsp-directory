CREATE OR REPLACE FUNCTION directory."user.add"(
    "@userNumber" varchar(20),
    "@firstName" varchar(255),
    "@lastName" varchar(255),
    "@dob" date,
    "@nationalId" varchar(255)
)
RETURNS TABLE(
    "actorId" integer,
    "endUserNumber" varchar(20),
    "firstName" varchar(255),
    "lastName" varchar(255),
    "dob" date,
    "nationalId" varchar(255),
    "isSingleResult" boolean
) AS
$BODY$
    WITH u as (
        INSERT INTO directory.endUser ("endUserNumber", "firstName", "lastName", "dob", "nationalId")
        VALUES ("@userNumber", "@firstName", "@lastName", "@dob", "@nationalId")
        RETURNING *
    )
    SELECT
        *,
        true AS "isSingleResult"
    FROM u
$BODY$
LANGUAGE SQL

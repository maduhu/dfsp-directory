CREATE OR REPLACE FUNCTION directory."user.add"(
    "@userNumber" varchar(20),
    "@name" varchar(255)
)
RETURNS TABLE(
    "actorId" integer,
    "endUserNumber" varchar(20),
    "name" varchar(255),
    "isSingleResult" boolean
) AS
$BODY$
    WITH u as (
        INSERT INTO directory.endUser ("endUserNumber", "name")
        VALUES ("@userNumber", "@name")
        RETURNING *
    )
    SELECT
        *,
        true AS "isSingleResult"
    FROM u
$BODY$
LANGUAGE SQL

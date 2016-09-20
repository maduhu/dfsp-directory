CREATE OR REPLACE FUNCTION directory."user.remove"(
  "@actorId" integer
) RETURNS TABLE(
  "actorId" integer,
  "isSingleResult" boolean
)
AS
$body$
  WITH a as (
    DELETE FROM directory.endUser
    WHERE "actorId" = "@actorId"
    RETURNING *
  )
  SELECT
    a."actorId",
    true AS "isSingleResult"
  FROM a
$body$
LANGUAGE SQL
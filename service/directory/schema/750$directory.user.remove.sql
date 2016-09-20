CREATE OR REPLACE FUNCTION directory."user.remove"(
  "@actorId" integer
) RETURNS TABLE(
  "actorId" integer
)
AS
$body$
  WITH a as (
    DELETE FROM directory.endUser
    WHERE "actorId" = "@actorId"
    RETURNING *
  )
  SELECT
    a."actorId"
  FROM a
$body$
LANGUAGE SQL
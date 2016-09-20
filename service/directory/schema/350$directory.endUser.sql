CREATE TABLE directory.endUser(
  "actorId" serial NOT NULL,
  "endUserNumber" varchar(20) NOT NULL,
  "name" varchar(255) NOT NULL,
  CONSTRAINT pkDirectoryEndUser PRIMARY KEY ("actorId"),
  CONSTRAINT ukDirectoryEndUserEndUserNumber UNIQUE ("endUserNumber")
)
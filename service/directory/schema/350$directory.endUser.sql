CREATE TABLE directory.endUser(
  "endUserId" serial NOT NULL,
  "endUserNumber" varchar(20) NOT NULL,
  "name" varchar(255) NOT NULL,
  CONSTRAINT pkDirectoryEndUser PRIMARY KEY ("endUserId"),
  CONSTRAINT ukDirectoryEndUserEndUserNumber UNIQUE ("endUserNumber")
)
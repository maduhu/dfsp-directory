CREATE TABLE directory.endUser(
  "actorId" serial NOT NULL,
  "endUserNumber" varchar(20) NOT NULL,
  "firstName" varchar(255) NOT NULL,
  "lastName" varchar(255) NOT NULL,
  "dob" date,
  "nationalId" varchar(255),
  CONSTRAINT pkDirectoryEndUser PRIMARY KEY ("actorId"),
  CONSTRAINT ukDirectoryEndUserEndUserNumber UNIQUE ("endUserNumber")
)
CREATE TABLE directory."endUser"
(
  "endUserId" serial NOT NULL,
  "endUserNumber" character varying(20) NOT NULL,
  "name" character varying(255) NOT NULL,
  CONSTRAINT "PK_endUser" PRIMARY KEY ("endUserId"),
  CONSTRAINT "UQ_endUser_endUserNumber" UNIQUE ("endUserNumber")
)
CREATE TABLE directory.endUser(
  endUserId serial NOT NULL,
  endUserNumber character varying(20) NOT NULL,
  name character varying(255) NOT NULL,
  CONSTRAINT pkDirectoryEndUser PRIMARY KEY (endUserId),
  CONSTRAINT ukDirectoryEndUserEndUserNumber UNIQUE (endUserNumber)
)
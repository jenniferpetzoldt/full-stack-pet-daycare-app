CREATE TABLE "pets" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(80) NOT NULL,
	"color" VARCHAR(50) NOT NULL,
	"breed" VARCHAR(100) NOT NULL
	);
	
CREATE TABLE "owners" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (60) NOT NULL
	);
	 
CREATE TABLE "pet_owner" (
	"id" SERIAL PRIMARY KEY,
	"pet_id" INT REFERENCES "pets",
	"owner_id" INT REFERENCES "owners"
	);
	
INSERT INTO "pets" ("name", "color", "breed")
VALUES ('Lena', 'Tri', 'Chihuahua mix'), ('Aphrodite', 'Tuxido', 'Pitbull'), ('Magnus', 'Tan', 'Pitbull');

INSERT INTO "owners" ("name")
VALUES ('Jenn'), ('Amber');

INSERT INTO "pet_owner" ("pet_id", "owner_id")
VALUES ('1', '1'), ('2', '2'), ('3', '2');

SELECT * FROM "pets";

DELETE FROM "pets" WHERE "id" = 6;
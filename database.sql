CREATE TABLE "pets" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(80) NOT NULL,
	"color" VARCHAR(50) NOT NULL,
	"breed" VARCHAR(100) NOT NULL,
	"check_in" BOOLEAN,
	"owner_id" INT REFERENCES "owners"
	);
	
CREATE TABLE "owners" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (60) NOT NULL
	);
	 
	
INSERT INTO "pets" ("name", "color", "breed", "check_in", "owner_id")
VALUES ('Lena', 'Tri', 'Chihuahua mix', 'true', '1'), 
('Aphrodite', 'Tuxido', 'Pitbull', 'true', '2'), 
('Magnus', 'Tan', 'Pitbull', 'true', '2');

INSERT INTO "owners" ("name")
VALUES ('Jenn'), ('Amber');

INSERT INTO "pet_owner" ("pet_id", "owner_id")
VALUES ('1', '1'), ('2', '2'), ('3', '2');

SELECT * FROM "pets";

DELETE FROM "owners" JOIN "pets" 
ON "owners"."id" = "pets"."owner_id" 
WHERE "owners"."id" = 2;

DELETE FROM "pets" WHERE "pets"."owner_id" = 1;
DELETE FROM "owners" WHERE "id" = 1;


SELECT "owners"."id", "owners"."name", COUNT("pets"."owner_id") 
FROM "owners" LEFT JOIN "pets" 
ON "owners"."id" = "pets"."owner_id" 
GROUP BY "owners"."id";

SELECT "owners"."name" as "owner_name", 
"pets"."name" as "pet_name", 
"pets"."breed" as "pet_breed", 
"pets"."color" as "pet_color" 
FROM "owners" JOIN "pets" 
ON "owners"."id" = "pets"."owner_id";
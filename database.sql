CREATE TABLE "owners" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (60) NOT NULL,
	"email" VARCHAR (100) NOT Null
	);

CREATE TABLE "pets" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(80) NOT NULL,
	"breed" VARCHAR(100) NOT NULL,
	"color" VARCHAR(50) NOT NULL,
	"check_in" VARCHAR (10) DEFAULT 'In',
	"owner_id" INT REFERENCES "owners" NOT NULL,
	"notes" VARCHAR(100)
	);

INSERT INTO "pets" ("name", "breed", "color", "check_in", "owner_id")
VALUES ('Lena', 'Chihuahua mix', 'Tri', 'In', '1'), ('Aphrodite', 'Pitbull', 'Tuxido', 'In', '2'), ('Magnus', 'Pitbull', 'Tan', 'In', '2');

INSERT INTO "owners" ("name", "email")
VALUES ('Jenn', 'j.petzoldt@gmail.com'), ('Amber', 'amber@gmail.com');

SELECT * FROM "pets";

DELETE FROM "owners" JOIN "pets" 
ON "owners"."id" = "pets"."owner_id" 
WHERE "owners"."id" = 2;

DELETE FROM "pets" WHERE "pets"."owner_id" = 1;
DELETE FROM "owners" WHERE "id" = 1;


SELECT "owners"."id", "owners"."name", "owners"."email", COUNT("pets"."owner_id") 
FROM "owners" LEFT JOIN "pets" 
ON "owners"."id" = "pets"."owner_id" 
GROUP BY "owners"."id";

SELECT  "pets"."id", "owners"."name" as "owner_name", "pets"."name" as "pet_name", "pets"."breed", 
"pets"."color", "pets"."check_in", "pets"."notes" 
FROM "owners" JOIN "pets"  
ON "owners"."id" = "pets"."owner_id" 
ORDER BY "pet_name";
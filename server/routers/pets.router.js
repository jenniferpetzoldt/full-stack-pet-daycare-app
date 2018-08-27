const express = require('express');
const router = express.Router();

const pool = require('../modules/pool.js');

//GET route to pull pet data from the pets table within the database
//as well as the owner name
router.get('/', function (req, res) {
    const query = `SELECT  "pets"."id", "owners"."name" as "owner_name", "pets"."name" as "pet_name", "pets"."breed", 
                    "pets"."color", "pets"."check_in", "pets"."notes" 
                    FROM "owners" JOIN "pets"  
                    ON "owners"."id" = "pets"."owner_id" 
                    ORDER BY "pet_name"`;
    pool.query(query).then((results) => {
        console.log('pets GET results', results.rows);
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error in pet GET', error);
        res.sendStatus(500);
    });
});// end GET route

//GET to pull all owner data from database
router.get('/owners', function (req, res) {
    const query = 'SELECT * FROM "owners";';
    pool.query(query).then((results) => {
        console.log('owners GET results', results.rows);
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error in owner GET', error);
        res.sendStatus(500);
    });
});// End GET route

//DELETE route to remoeve a pet from the pets table within the database
router.delete('/:id', function (req, res) {
    const id = req.params.id;
    const query = 'DELETE FROM "pets" WHERE "id" = ($1);';
    pool.query(query, [id])
        .then((results) => {
            console.log(results);
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error with pet DELETE', error);
            res.sendStatus(500);
        });
});//end DELETE route

//POST route to add new pet data to the pets table within the database
router.post('/', function (req, res) {
    const petToAdd = req.body;
    const query = `INSERT INTO "pets" ("name", "breed", "color", "check_in", "owner_id", "notes") VALUES ($1, $2, $3, $4, $5, $6);`;
    pool.query(query, [petToAdd.name, petToAdd.breed, petToAdd.color, petToAdd.check_in, petToAdd.owner_id, petToAdd.notes])
        .then(() => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('Error in pet POST', error);
            res.sendStatus(500);
        });
});// End POST route

//PUT route to update pet's check in status
router.put('/:id', (req, res) => {
    const petToUpdate = req.body;
    const id = req.params.id;
    const query = `UPDATE "pets" SET "check_in" = ($1) WHERE "id" = ($2);`;
    pool.query(query, [petToUpdate.check_in, id])
        .then((results) => {
            console.log('check-in updated', results);
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error with update', error);
            res.sendStatus(500);
        });
});// End PUT route

module.exports = router;
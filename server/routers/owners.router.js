const express = require('express');
const router = express.Router();

const pool = require('../modules/pool.js');

//GET
router.get('/', function (req, res) {
    console.log('in owner GET route');
    const query = `SELECT "owners"."id", "owners"."name", COUNT("pets"."owner_id") 
                    FROM "owners" LEFT JOIN "pets" ON "owners"."id" = "pets"."owner_id" 
                    GROUP BY "owners"."id";`;
    pool.query(query).then((results) => {
        console.log('owners GET results', results.rows);
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error in owner GET', error);
        res.sendStatus(500);
    });
});// End GET route


//POST
router.post('/', function (req, res) {
    const ownerToAdd = req.body;
    console.log('In owner POST route:', req.body);
    const query = `INSERT INTO "owners" ("name", "email") VALUES ($1, $2);`;
    pool.query(query, [ownerToAdd.name, ownerToAdd.email])
        .then(() => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('Error in owner POST', error);
            res.sendStatus(500);
        });
});// End POST route

//DELETE
router.delete('/:id', function (req, res) {
    console.log('In owner DELETE route', req.params.id);
    const id = req.params.id;
    const query = ` DELETE FROM "owners" WHERE "id" = ($1);`;

                    // DELETE FROM "pets" WHERE "pets"."owner_id" =($1);
    pool.query(query, [id])
        .then((results) => {
            console.log(results);
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error with owner DELETE:', error);
            res.sendStatus(500);
        });
});//end DELETE route

module.exports = router;
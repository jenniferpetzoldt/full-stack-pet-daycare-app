const express = require('express');
const router = express.Router();

const pool = require('../modules/pool.js');

//GET route to gather the owner data as well as how many pets are linked to that owner
router.get('/', function (req, res) {
    const query = `SELECT "owners"."id", "owners"."name", "owners"."email", COUNT("pets"."owner_id") 
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


//POST route to add new owner to database
router.post('/', function (req, res) {
    const ownerToAdd = req.body;
    const query = `INSERT INTO "owners" ("name", "email") VALUES ($1, $2);`;
    pool.query(query, [ownerToAdd.name, ownerToAdd.email])
        .then(() => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('Error in owner POST', error);
            res.sendStatus(500);
        });
});// End POST route

//DELETE route to remove owner from database
router.delete('/:id', function (req, res) {
    const id = req.params.id;
    // will only delete if there are no pets linked to the owner
    // a separate query would need to be run first to delete the pets associated with the owner
    const query = ` DELETE FROM "owners" WHERE "id" = ($1);`;
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
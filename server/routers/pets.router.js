const express = require('express');
const router = express.Router();

const pool = require('../modules/pool.js');

//GET route to pull pet data from the pets table within the database
router.get('/', function(req, res){
    console.log('in pet GET route');
    const query = 'SELECT * FROM "pets";';
    pool.query(query).then((results)=>{
        console.log('pets GET results', results);
        res.send(results.rows);
    }).catch((error)=>{
        console.log('Error in pet GET', error);
        res.sendStatus(500);
    });
});
//DELETE route

//POST route to add pet data to the pets table within the database
router.post('/', function(req, res){
    const petToAdd = req.body;
    console.log ('In pet POST route: ', req.body);
    const query = `INSERT INTO "pets" ("name", "color", "breed") VALUES ($1, $2, $3);`;
    pool.query(query, [petToAdd.name, petToAdd.color, petToAdd.breed])
    .then(()=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.log('Error in pet POST', error);
        res.sendStatus(500);
    });
});// End POST route

//PUT route


module.exports = router;
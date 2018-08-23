const express = require('express');
const router = express.Router();

const pool = require('../modules/pool.js');

//GET route

//DELETE route

//POST route
router.post('/', function(req, res){
    const petToAdd = req.body;
    console.log ('In pet POST route: ', petToAdd);
    const query = `INSERT INTO "pets" ("name", "color", "breed") VALUES ($1, $2);`;
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
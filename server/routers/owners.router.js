const express = require('express');
const router = express.Router();

const pool = require('../modules/pool.js');

//GET
router.get('/', function(req,res){
    console.log('in owner GET route');
    const query = 'SELECT * FROM "owners";';
    pool.query(query).then((results)=>{
        console.log('owners GET results', results.rows);
        res.send(results.rows);
    }).catch((error)=>{
        console.log('Error in owner GET', error);
        res.sendStatus(500);
    });
});// End GET route


//POST
router.post('/', function (req, res){
    const ownerToAdd = req.body;
    console.log('In owner POST route:', req.body);
    const query = `INSERT INTO "owners" ("name") VALUES ($1);`;
    pool.query(query, [ownerToAdd.name])
    .then(()=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.log('Error in owner POST', error);
        res.sendStatus(500);
    });
});// End POST route

//DELETE

module.exports = router;
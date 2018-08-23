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
});


//POST

//DELETE

module.exports = router;
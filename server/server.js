//Requirements
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const petsRouter = require('./routers/pets.router.js');
const ownersRouter = require('./routers/owners.router.js');

//Configure body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Setup Routes
app.use('/pets', petsRouter);
app.use('/owners', ownersRouter);

//Static Files
app.use(express.static('server/public'));

//Start the server
app.listen(PORT, ()=>{
    console.log(`App is running on port: ${PORT}`);
});
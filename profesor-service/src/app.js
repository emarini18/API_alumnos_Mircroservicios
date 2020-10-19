const express = require('express');
const cors = require('cors');
const app = express();
const Profesor = require('./models/profesor-model');
const bodyParser = require('body-parser');


// MIDDLEWERES
// parse application/json
app.use(bodyParser.json());

// Cors
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// rutas
app.get('/profesores', async (req, res)=>{
    // Recuperar todos los  valores
    const user = await Profesor.findAll();
    res.json(user);
});

module.exports=app;



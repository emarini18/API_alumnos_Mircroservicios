const express = require('express');
const cors = require('cors');
const app = express();
const Horario = require('./models/horario-model');
const bodyParser = require('body-parser');


// MIDDLEWERES
// parse application/json
app.use(bodyParser.json());

// Cors
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/horarios', async (req, res)=>{
    // Recuperar todos los  valores
    const user = await Horario.findAll();
    res.json(user);
});

module.exports=app;
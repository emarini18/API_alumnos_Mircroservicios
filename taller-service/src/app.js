const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const Talleres = require('./models/taller-model');
const Profesor=require('./models/profesor-model');
const Horario=require('./models/horario-model');
const Sedes=require('./models/sedes-model');
const { Op } = require("sequelize");


// MIDDLEWERES
// parse application/json
app.use(bodyParser.json());

// Cors
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/talleres', async(req, res)=>{
    const user = await Talleres.findAll({ 
        include: [Profesor, Horario, Sedes]
    });
    res.json(user);
})

app.get('/talleres/:id', async(req, res)=>{
    const user = await Talleres.findAll({ 
        include: [Profesor, Horario, Sedes],
        where: {
            ID_TALLER: {
                [Op.eq]: req.params.id
            }
        }
    });
    res.json(user);



})

module.exports=app;
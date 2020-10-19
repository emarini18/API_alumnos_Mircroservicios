const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const Alumnos = require('./models/alumno-model');
const { validarPassword } = require('./controllers/alumno.controllers');


// MIDDLEWERES
// parse application/json
app.use(bodyParser.json());

// Cors
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// RUTAS
app.get('/', async (req, res) => {
    // Recuperar todos los  valores
    const user = await Alumnos.findAll();
    res.json(user);
});


// Ruta Registrarse
app.post('/alumnos/registrar', async (req, res, next) => {

    const { nombre, apellido, username, password,
        dni, email, celular } = req.body;

    const alumnito = await Alumnos.create({
        NOMB_ALUMNO: nombre,
        APEL_ALUMNO: apellido,
        USER_ALUMNO: username,
        PASS_ALUMNO: password,
        DNI_ALUMNO: dni,
        CORREO_ALUMNO: email,
        CEL_ALUMNO: celular
    }, {
        fields: ['NOMB_ALUMNO', 'APEL_ALUMNO', 'USER_ALUMNO',
            'PASS_ALUMNO', 'DNI_ALUMNO', 'CORREO_ALUMNO', 'CEL_ALUMNO']
    });



    // Enviar status y valor del token
    res.json({
        auth: true,
        id: alumnito.USER_ALUMNO
    });
});


// Ruta Login
app.post('/alumnos/login', async (req, res, next) => {

    const { username, password } = req.body;
    // console.log(username, password);

    const alumnito = await Alumnos.findOne({
        where: {
            USER_ALUMNO: username
        }
    });

    if (!alumnito) {
        return res.status(404).json({
            error: 'El usuario no existe'
        });
    }

    console.log(alumnito);

    const passwordValidator = validarPassword(password, alumnito.dataValues.PASS_ALUMNO);
    if (!passwordValidator) {
        return res.status(401).json({
            auth: false,
            token: null
        });
    }

    // Enviar status y valor del token
    res.json({
        auth: true,
        id: alumnito.USER_ALUMNO
    });

});



// Ruta Obtener perfil
app.get('/alumnos/profile/:id', async (req, res, next) => {
    console.log('parametros', req.params);

    // console.log('req.userId',req.userId);
    const alumnito = await Alumnos.findOne({
        attributes: ['NOMB_ALUMNO', 'APEL_ALUMNO', 'USER_ALUMNO',
            'DNI_ALUMNO', 'CORREO_ALUMNO', 'CEL_ALUMNO', 'IMG_ALUMNO'],
        where: {
            // USER_ALUMNO: req.userId
            USER_ALUMNO: req.params.id
        }
    });

    // Si el alumno no existe
    if (!alumnito) {
        return res.status(404).send('Alumno no encontrado');
    }

    // Si el alumno existe, enviartlo como json
    res.json(alumnito);
})


module.exports = app;


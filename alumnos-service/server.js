const app = require("./src/app");
require('./src/config/index');

// Puerto por defecto
// const port = process.env.PORT || 3000;
const port = 3000;

// Comenzar servidor express
app.listen(port, () => {
    console.log(`Servidor iniciando en el puerto ${ port }`);
});


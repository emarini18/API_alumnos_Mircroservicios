const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/index');


const profesor = sequelize.define('profesor',{
    ID_PROFESOR:{
        type: DataTypes.INTEGER,
        primaryKey: true   
    },
    DATOS_PROFESOR:{
        type: DataTypes.STRING(150),
     }
},

{
    timestamps: false,
    tableName:'PROFESOR'
});

module.exports=profesor;


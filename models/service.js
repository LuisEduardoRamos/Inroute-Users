'use strict'

let Sequelize = require('sequelize');

const sequelize =  new Sequelize('Usuarios', 'SA', 'Inroute2019', {
    host: 'localhost',
    dialect: 'mssql'
});

let Service =  sequelize.define('Servicio', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    nombre:{
        type: Sequelize.STRING, 
        allowNull: false
    }
});

sequelize.sync();
module.exports = Service;


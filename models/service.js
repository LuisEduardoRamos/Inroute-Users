'use strict'

let Sequelize = require('sequelize');

const sequelize =  new Sequelize('Usuarios1', 'sa', 'LuisEduardo1997', {
    host: 'localhost',
    dialect: 'mssql'
});

let Service =  sequelize.define('Service', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    name:{
        type: Sequelize.STRING, 
        allowNull: false
    }
});

sequelize.sync();
module.exports = Service;
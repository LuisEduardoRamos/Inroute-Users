'use strict'

let Sequelize = require('sequelize');

const sequelize =  new Sequelize('usuarios', 'sa', 'LuisEduardo1997', {
    host: 'localhost',
    dialect: 'mssql'
});

let Client = sequelize.define('Client', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{ 
        type: Sequelize.STRING, 
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

sequelize.sync();
module.exports = Client;
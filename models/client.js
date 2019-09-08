'use strict'

let Sequelize = require('sequelize');

const sequelize =  new Sequelize('Usuarios1', 'sa', 'LuisEduardo1997', {
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
    },
    image:{
        type: Sequelize.STRING,
        allowNull: true
    }
});

sequelize.sync();
module.exports = Client;
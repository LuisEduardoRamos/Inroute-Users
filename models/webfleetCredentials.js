'use strict'

let Sequelize = require('sequelize');
let Client = require('./client')

const sequelize =  new Sequelize('Usuarios1', 'sa', 'LuisEduardo1997', {
    host: 'localhost',
    dialect: 'mssql'
});

let WebfleetCredentials = sequelize.define('WebfleetCredentials', {
    id:{
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    client:{
        type: Sequelize.INTEGER,
        references:{
            model: Client,
            key: 'id'
        }
    },
    account:{
        type: Sequelize.STRING,
        allowNull: false
    },
    user:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    apiKey:{
        type: Sequelize.STRING, 
        allowNull: false
    }
});

sequelize.sync();
module.exports = WebfleetCredentials;
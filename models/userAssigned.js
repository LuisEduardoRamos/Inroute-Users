'use strict'

let Sequelize = require('sequelize');
let Client = require('./client');
let User = require('./user');

const sequelize =  new Sequelize('Usuarios1', 'sa', 'LuisEduardo1997', {
    host: 'localhost',
    dialect: 'mssql'
});

let UserAssigned = sequelize.define('UserAssigned', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    client:{
        type: Sequelize.INTEGER,
        references:{
            model: Client,
            key: "id"
        }
    },
    user:{
        type: Sequelize.INTEGER,
        references:{
            model: User, 
            key: "id"
        }
    }
});

sequelize.sync();
module.exports = UserAssigned;
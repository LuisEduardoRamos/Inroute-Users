'use strict'

let Sequelize = require('sequelize');
let WebfleetCredentials = require('./webfleetCredentials')
let Service = require('./service')

const sequelize =  new Sequelize('Usuarios1', 'sa', 'LuisEduardo1997', {
    host: 'localhost',
    dialect: 'mssql'
});

let Permissions = sequelize.define('Permissions', {
    id:{
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    webfleetCredentials:{
        type: Sequelize.INTEGER,
        references:{
            model: WebfleetCredentials,
            key: 'id'
        }
    },
    service:{
        type: Sequelize.INTEGER,
        references:{
            model: Service,
            key: 'id'
        }
    }
})
 
sequelize.sync();
module.exports = Permissions;
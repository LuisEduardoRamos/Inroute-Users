'use strict'

let Sequelize = require('sequelize');
let WebfleetCredentials = require('./webfleetCredentials')
let PermitService = require('./permitService');
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASS, {
    host: "localhost",
    dialect: "mssql"
});

let Permissions = sequelize.define('PermisosCredenciales', {
    id:{
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    servicioPermitido:{
        type: Sequelize.INTEGER,
        references:{
            model: PermitService,
            key: 'id'
        }
    },
    credencial:{
        type: Sequelize.INTEGER,
        references:{
            model: WebfleetCredentials,
            key: 'id'
        }
    }
})
 
sequelize.sync();
module.exports = Permissions;
'use strict'

let Sequelize = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASS, {
    host: "localhost",
    dialect: "mssql"
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


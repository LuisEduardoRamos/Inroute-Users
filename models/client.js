'use strict'

let Sequelize = require('sequelize');
require('dotenv').config()
const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASS, {
    host: "localhost",
    dialect: "mssql"
});

let Client = sequelize.define('Cliente', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: Sequelize.STRING,
        allowNull: false
    },
    correo:{ 
        type: Sequelize.STRING, 
        allowNull: false
    },
    imagen:{
        type: Sequelize.STRING,
        allowNull: true
    },
    cuenta:{
        type: Sequelize.STRING,
        allowNull: true
    },
    apikey:{
        type: Sequelize.STRING,
        allowNull: true
    }
});

sequelize.sync();
module.exports = Client;
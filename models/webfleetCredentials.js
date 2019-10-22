'use strict'

let Sequelize = require('sequelize');
let Client = require('./client')


const sequelize = new Sequelize("Usuarios", "sa", "LuisEduardo1997", {
    host: "localhost",
    dialect: "mssql"
});

let WebfleetCredentials = sequelize.define('Credencial', {
    id:{
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    usuario:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cliente:{
        type: Sequelize.INTEGER,
        references:{
            model: Client,
            key: 'id'
        }
    }
});

sequelize.sync();
module.exports = WebfleetCredentials;
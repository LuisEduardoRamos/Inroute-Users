'use strict'

let Sequelize = require('sequelize');
let Client = require('./client')
let Role = require('./role');


const sequelize = new Sequelize("Usuarios", "sa", "Inroute2019", {
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
    role: { 
        type: Sequelize.INTEGER,
        references:{
            model: Role,
            key: 'id'
        }
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
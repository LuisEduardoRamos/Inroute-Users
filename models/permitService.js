'use strict'

let Sequelize = require('sequelize');
let Service = require('./service');
let Client = require ('./client');

const sequelize = new Sequelize("Usuarios", "sa", "Inroute2019", {
    host: "localhost",
    dialect: "mssql"
});
let PermitService =  sequelize.define('ServiciosPermitido', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    servicio:{
        type: Sequelize.INTEGER, 
        references:{
            model: Service,
            key: 'id'
        }
        
    },
    cliente: {
        type: Sequelize.INTEGER,
        references:{
            model: Client,
            key:'id'
        }
    },
    webfleet: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
    },
    fecha: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

sequelize.sync();
module.exports = PermitService;
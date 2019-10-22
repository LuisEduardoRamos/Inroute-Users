'use strict'

let Sequelize = require('sequelize');

const sequelize =  new Sequelize('Usuarios', 'SA', 'Inroute2019', {
    host: 'localhost',
    dialect: 'mssql'
});

let User = sequelize.define('User',  {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    rol:{
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
module.exports = User
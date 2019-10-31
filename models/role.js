'use strict'

let Sequelize = require('sequelize');

const sequelize = new Sequelize("Usuarios", "sa", "Inroute2019", {
    host: "localhost",
    dialect: "mssql"
});

let Role = sequelize.define('Role',  {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

sequelize.sync();
module.exports = Role
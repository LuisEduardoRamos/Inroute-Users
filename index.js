'use strict'
require('dotenv').config()
let app = require('./app');
let port = 8002;
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASS, {
    host: "localhost",
    dialect: "mssql"
});

sequelize.authenticate().then(()=>{
    console.log('Connection to BD established successfully.');
    app.listen(process.env.PORT, function(){
        console.log('App running on port: ' + process.env.PORT);
    });
}).catch(err => {
    console.log('Unable to connect to the database', err);
});



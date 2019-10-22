'use strict'

let app = require('./app');
let port = 8002;
const Sequelize = require('sequelize');

const sequelize =  new Sequelize('Usuarios', 'SA', 'Inroute2019', {
    host: 'localhost',
    dialect: 'mssql'
});

sequelize.authenticate().then(()=>{
    console.log('Connection to BD established successfully.');
    app.listen(port, function(){
        console.log('App running on port: ' + port);
    });
}).catch(err => {
    console.log('Unable to connect to the database', err);
});



'use strict'

let app = require('./app');
let port = 8005;
const Sequelize = require('sequelize');

const sequelize = new Sequelize("Usuarios", "sa", "LuisEduardo1997", {
    host: "localhost",
    dialect: "mssql"
});

sequelize.authenticate().then(()=>{
    console.log('Connection to BD established successfully.');
    app.listen(port, function(){
        console.log('App running on port: ' + port);
    });
}).catch(err => {
    console.log('Unable to connect to the database', err);
});



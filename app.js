'use strict'

let express = require('express');
let bodyParser = require('body-parser');

let app = express();

let client_routes = require('./routes/client');
let credential_routes = require('./routes/webfleetCredentials');
let user_routes = require('./routes/user');
let user_assigned_routes = require('./routes/userAssigned');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/api', client_routes);
app.use('/api', credential_routes);
app.use('/api', user_routes);
app.use('/api', user_assigned_routes);

module.exports = app;
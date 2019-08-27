'use strict'

let express = require('express');
let ServiceControllers = require('../controllers/service');
let api = express.Router();

api.post('/save-service', ServiceControllers.saveService);
api.put('/edit-service/:id', ServiceControllers.editUser);
api.get('/get-service/:id', ServiceControllers.getService);
api.get('/get-services', ServiceControllers.getServices);
api.delete('/delete-service/:id', ServiceControllers.deleteService);

module.exports = api;
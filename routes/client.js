'use strict'

let express = require('express');
let ClientController = require('../controllers/client');
let api = express.Router();

api.post('/save-client', ClientController.saveClient);
api.put('/edit-client/:id', ClientController.editClient);
api.get('/get-client/:id', ClientController.getClient);
api.get('/get-clients', ClientController.getClients);
api.delete('/delete-client/:id', ClientController.deleteClient);

module.exports = api;
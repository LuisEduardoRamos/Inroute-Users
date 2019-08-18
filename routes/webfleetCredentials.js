'use strict'

let express = require('express');
let Credentials = require('../controllers/webfleetCredentials');
let api = express.Router();

api.post('/save-credentials', Credentials.saveCredentials);
api.put('/edit-credentials/:id', Credentials.editCredentials);
api.get('/get-credential/:id', Credentials.getCredential);
api.get('/get-credentials', Credentials.getCredentials);
api.get('/get-credentials/:id', Credentials.getCredentialsByClient);

module.exports = api;
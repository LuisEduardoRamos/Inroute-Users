'use strict'

let express = require('express');
let ClientController = require('../controllers/client');
let md_auth = require('../middleware/authenticated');
let api = express.Router();

let multipart = require('connect-multiparty');
let md_upload = multipart({uploadDir: './uploads'})

api.post('/save-client', ClientController.saveClient);
api.put('/edit-client/:id', ClientController.editClient);
api.get('/get-client/:id', ClientController.getClient);
api.get('/get-clients', ClientController.getClients);
api.delete('/delete-client/:id', ClientController.deleteClient);
api.post('/upload-image-client/:id', md_upload, ClientController.uploadImage);
api.get('/get-image-client/:imageFile', ClientController.getImageFile);
api.get('/get-image-token',md_auth.ensureAuth, ClientController.getImageFileByToken);

module.exports = api;
'use strict'

let express = require('express');
let PermissionsController = require('../controllers/permitService');
let api = express.Router();

api.post('/save-permitService', PermissionsController.savePermitPermission);
api.put('/edit-permitService/;id', PermissionsController.editPermission);
api.get('/get-permitService/:id', PermissionsController.getPermission);
api.get('/get-permitServices', PermissionsController.getPemrissions);
api.get('/get-permitService-client/:id', PermissionsController.getPermissionsByClient);
api.delete('/delete-permitService/:id', PermissionsController.deletePermission);

module.exports = api;

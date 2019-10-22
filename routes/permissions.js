'use strict'

let express = require('express');
let PermissionsController = require('../controllers/permissions');
let api = express.Router();

api.post('/save-permission', PermissionsController.savePermission);
api.put('/edit-permission/;id', PermissionsController.editPermission);
api.get('/get-permission/:id', PermissionsController.getPermission);
api.get('/get-permissions/:id', PermissionsController.getPemrissions);
api.get('/get-permission-client/:id', PermissionsController.getPermissionsByClient);
api.delete('/delete-permission/:id', PermissionsController.deletePermission);

module.exports = api;

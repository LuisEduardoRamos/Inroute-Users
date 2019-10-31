'use strict'

let express = require('express');
let RoleControllers = require('../controllers/role');
let api = express.Router();

api.post('/save-role', RoleControllers.saveRole);
api.put('/edit-role/:id', RoleControllers.editRole);
api.get('/get-role/:id', RoleControllers.getRol);
api.get('/get-roles', RoleControllers.getRoles);
api.delete('/delete-role/:id', RoleControllers.deleteRole);

module.exports = api;



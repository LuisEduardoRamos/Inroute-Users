'use strict'

let express = require('express');
let UserAssigned = require('../controllers/userAssigned');
let api = express.Router();

api.post('/save-assigned-user', UserAssigned.saveUserAssigned);
api.put('/edit-assigned-user/:id', UserAssigned.editUserAssigned);
api.get('/get-assigned-user/:id', UserAssigned.getUserAssigned);
api.get('/get-assigned-users', UserAssigned.getUsersAssigned);
api.delete('/delete-assigned-user/:id', UserAssigned.deleteUserAssigned);

module.exports = api;
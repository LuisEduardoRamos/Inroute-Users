'use strict'

let express = require('express');
let UserAssigned = require('../controllers/userAssigned');
let api = express.Router();

api.post('/save-user-assigned', UserAssigned.saveUserAssigned);
api.put('/edit-user-assigned/:id', UserAssigned.editUserAssigned);

module.exports = api;
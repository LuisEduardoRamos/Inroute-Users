'use strict'

let express = require('express');
let UserControllers = require('../controllers/user');
let api = express.Router();

api.post('/save-user', UserControllers.saveUser);
api.put('/edit-user/:id', UserControllers.editUser);

module.exports = api;
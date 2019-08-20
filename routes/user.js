'use strict'

let express = require('express');
let UserControllers = require('../controllers/user');
let api = express.Router();

api.post('/save-user', UserControllers.saveUser);
api.put('/edit-user/:id', UserControllers.editUser);
api.get('/get-user/:id', UserControllers.getUser);
api.get('/get-users', UserControllers.getUsers);
api.delete('/delete-user/:id', UserControllers.deleteUsers);

module.exports = api;
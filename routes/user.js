'use strict'

let express = require('express');
let UserControllers = require('../controllers/user');
let api = express.Router();

let multipart = require('connect-multiparty');
let md_upload = multipart({uploadDir: './uploads'})

api.post('/save-user', UserControllers.saveUser);
api.put('/edit-user/:id', UserControllers.editUser);
api.get('/get-user/:id', UserControllers.getUser);
api.get('/get-users', UserControllers.getUsers);
api.delete('/delete-user/:id', UserControllers.deleteUsers);
api.post('/upload-image-user/:id', md_upload, UserControllers.uploadImage); 
api.post('/login-user', UserControllers.userLogin);


module.exports = api;
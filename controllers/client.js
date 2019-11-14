'use strict'

let Client = require('../models/client');
let Sequelize = require('sequelize');
let fs = require('fs');
let path = require('path');
let jwt = require('../services/jwt')
let bcrypt = require('bcrypt-nodejs')
require('dotenv').config()


const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASS, {
    host: "localhost",
    dialect: "mssql"
});

function saveClient(req, res){
    let client = {}
    let params = req.body;

    client.nombre = params.nombre;
    client.correo = params.correo;
    client.image = '';
    client.cuenta = params.cuenta;
    client.apikey = params.apikey;
    console.log(client)
    if(client.nombre!==null && client.nombre!==''&& client.nombre!==undefined &&
        client.correo!==null && client.correo!=='' && client.correo!==undefined){
        sequelize.sync().then(()=>{
            Client.create(client).then(clientCreated=>{
                if(clientCreated){
                    res.status(200).send(clientCreated)
                }else{
                    res.status(200).send({errorCode: 404, message:'El cliente nos se ha creado'})
                }
            });
        });
    }
    else{
        res.status(200).send({errorCode:403, message: 'Introduzca todos los datos'})
    }
    
}

function editClient(req, res){
    let clientId = req.params.id;
    let changes = req.body;
    if(clientId!==null&&clientId!==''&&clientId!==undefined){
        Client.update(changes, {where:{id: clientId}}).then(clientUpdated=>{
            if(clientUpdated){
                Client.findOne({where:{id:clientId}}).then(clientFound=>{
                    if(clientFound){
                        res.status(200).send(clientFound);
                    }else{
                        res.status(200).send({erroCode:404, message: 'No se ha encontrado el cliente'});
                    }
                });
            }else{
                res.status(200).send({errorCode: 404, message: 'Se ha producido un error.'});
            }
        });
    }else{
        res.status(200).send({errorCode:403, message: 'Ingrese el id del cliente.'})
    }
}

function getClient(req, res){
    let clientId = req.params.id;
    console.log(clientId)
    if(clientId!==null&&clientId!==''&&clientId!==undefined){
        Client.findOne({where:{id:clientId}}).then(clientFound=>{
            if(clientFound){
                res.status(200).send(clientFound);
            }else{
                res.status(200).send({erroCode:404, message: 'No se ha encontrado el cliente'});
            }
        });
    }else{
        res.status(200).send({errorCode: 403, message: 'Introduzca el id del cliente.'});
    }
}

function getClients(req, res){
    Client.findAll().then(clientsFound=>{
        if(clientsFound){
            res.status(200).send(clientsFound);
        }else{
            res.status(200).send({errorCode: 404, message: 'No se han encontrado clientes.'});
        }
    });
}

function deleteClient(req, res){
    let clientId = req.params.id;
    if(clientId!==null&&clientId!==''&&clientId!==undefined){
        Client.destroy({where:{id:clientId}}).then(clientRemoved=>{
            if(clientRemoved){
                res.status(200).send({message:'Cliente eliminado.'});
            }else{
                res.status(200).send({errorCode:404, message:'El cliente no se ha eliminado.'});
            }
        });
    }else{
        res.status(200).send({erroCode:403, message: 'Ingrese el id del cliente.'});
    }
}

function uploadImage(req, res){
    let userId = req.params.id;
    let file_name = 'No subido...';
    if(req.files){
        let file_path = req.files.image.path;
        let file_split = file_path.split('/');
        let file_name = file_split[1];

        let ext_split = file_name.split('.');
        let file_ext = ext_split[1];
        if(file_ext == 'png'|| file_ext == 'jpg'|| file_ext == 'gif'){
            sequelize.sync().then(()=>{
                Client.update({imagen: file_name}, {where:{id: userId}}).then(userUpdated => {
                    if(userUpdated){
                        console.log(userUpdated)
                        res.status(200).send(userUpdated);
                    }else{
                        res.status(200).send({message: 'El cliente no se ha actualizado'});
                    }
                });
            });  
        }else{
            res.status(200).send({errorCode: 403, message: 'Formato no aceptado'});
        }
    }else{
        res.status(200).send({errorCode: 403, message: 'Ingrese una foto'});
    }
}

function getImageFile(req, res){
    let imageFile = req.params.imageFile;
    let path_file = "./uploads/" + imageFile;
    fs.exists(path_file, function(exists){
        if (exists) {
            res.sendFile(path.resolve(path_file));
        }else {
            res.status(200).send({ message: "No existe la imagen..." });
        }
    });
}
function getImageFileByToken(req, res){
    let imageFile = req.user.imagen;
    let path_file = "./uploads/" + imageFile;
    fs.exists(path_file, function(exists){
        if (exists) {
            res.sendFile(path.resolve(path_file));
        }else {
            res.status(200).send({ message: "No existe la imagen..." });
        }
    });
}

module.exports = { saveClient, editClient, getClient, getClients, deleteClient, uploadImage, getImageFile, getImageFileByToken };
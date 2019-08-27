'use strict'

let Permissions = require('../models/permissions');
let WebfleetCredentials = require('../models/webfleetCredentials');
let Service = require('../models/service');
let Sequelize = require('sequelize');

const sequelize = new Sequelize("usuarios", "sa", "LuisEduardo1997", {
    host: "localhost",
    dialect: "mssql"
});

function savePermission(req, res){
    let permission = {};
    let params = req.body;
    permission.webfleetCredentials = params.webfleetCredentials;
    permission.service = params.service;
    if(permission.webfleetCredentials!==''&&permission.webfleetCredentials!==undefined&&permission.webfleetCredentials!==null&&
       permission.service!==''&&permission.service!==undefined&&permission.service!==null){
        WebfleetCredentials.findOne({where:{id:permission.webfleetCredentials}}).then(credentialsFound => {
            if(credentialsFound){
                Service.findOne({where:{id:permission.service}}).then(serviceFound => {
                    if(serviceFound){
                        Permissions.create(permission).then(permissionCreated => {
                            if(permissionCreated){
                                res.status(200).send(permissionCreated);
                            }else{
                                res.status(200).send({errorCode: 404, message: 'El permiso no se ha asignado.'});
                            }
                        });
                    }else{
                        res.status(200).send({errorCode: 404, message: 'El servicio no coincide.'});
                    }
                });
            }else{
                res.status(200).send({errorCode: 404, message: 'Las credenciales no coinciden.'});
            }
        });
    }else{
        res.status(200).send({errorCode: 403, message: 'Ingrese todos los datos.'});
    }
}

function editPermission(req, res){
    let id = req.params.id;
    let changes = req.body;
    let aux1 = true;
    let aux2 = true;
    if(changes.webfleetCredentials!==''&&changes.webfleetCredentials!==null&&changes.webfleetCredentials!==undefined){
        WebfleetCredentials.findOne({where:{id:changes.webfleetCredentials}}).then(credentialsFound => {
            if(credentialsFound){
                aux1 = true;
            }else{
                aux1 = false;
            }
        });
    }
    if(changes.service!==null&&changes.service!==''&&changes.service!==undefined){
        Service.findOne({where:{id:changes.service}}).then(serviceFound => {
            if(serviceFound){
                aux2 = true;
            }else{
                aux2 = false;
            }
        });
    }

    if(aux1==true&&aux2==true){
        Permissions.update(changes, {where:{id:id}}).then(permissionUpdated=>{
            if(permissionUpdated){
                Permissions.findOne({where:{id:id}}).then(permissionFound => {
                    res.status(200).send(permissionFound);
                });
            }else{
                res.status(200).send({errorCode: 403, message: 'El permiso no se encuentra'});
            }
        });
    }else{
        res.status(200).send({errorCode:403, message: 'El servicio o credenciales no existe.'});
    }
}

function getPermission(req, res){
    let id = req.params.id;
    if(id!==''&&id!==undefined&&id!==null){
        Permissions.findOne({where:{id:id}}).then(permissionFound => {
            if(permissionFound){
                res.status(200).send(permissionFound);
            }else{
                res.status(200).send({errorCode: 404, message: 'El permiso no se encotntró.'});
            }
        });
    }else{
        res.status(200).send({errorCode: 403, message: 'Ingrese el id del permiso'});
    }
}

function getPemrissions(req, res){
    Permissions.findAll().then(permissionsFound => {
        if(permissionsFound){
            res.status(200).send(permissionsFound);
        }else{
            res.status(200).send({errorCode: 404, message: 'No se han encontrado permisos.'});
        }
    })
}

function getPermissionsByCredentials(req, res){
    let id = req.params.id;
    if(id!==''&&id!==undefined&&id!==null){
        Permissions.findAll({where:{webfleetCredentials:id}}).then(permissionFound => {
            if(permissionFound){
                res.status(200).send(permissionFound);
            }else{
                res.status(200).send({errorCode: 404, message: 'El permiso no se encotntró.'});
            }
        });
    }else{
        res.status(200).send({errorCode: 403, message: 'Ingrese el id de las credenciales'});
    }
}

function deletePermission(req, res){
    let id = req.params.id;
    if(id!==''&&id!==undefined&&id!==null){
        Permissions.destroy({where:{id:id}}).then(permissionRemoved => {
            if(permissionRemoved){
                res.status(200).send(permissionRemoved);
            }else{
                res.status(200).send({errorCode: 404, message: 'No se encontraron permisos.'});
            }
        });
    }else{
        res.status(200).send({errorCode: 403, message: 'Ingrese el id de los permisos.'});
    }
}

module.exports = { savePermission, editPermission, getPemrissions, getPermissionsByCredentials, deletePermission };

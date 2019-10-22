'use strict'

let PermitService = require('../models/permitService');
let Client = require('../models/client');
let Service = require('../models/service');
let Sequelize = require('sequelize');

const sequelize = new Sequelize("Usuarios", "sa", "LuisEduardo1997", {
    host: "localhost",
    dialect: "mssql"
});

function savePermitPermission(req, res){
    let permitPermission = {};
    let params = req.body;
    permitPermission.servicio = params.servicio;
    permitPermission.cliente = params.cliente;
    permitPermission.webfleet = params.webfleet;
    permitPermission.fecha = params.fecha;
    if(permitPermission.servicio!==''&&permitPermission.servicio!==undefined&&permitPermission.servicio!==null&&
       permitPermission.cliente!==''&&permitPermission.cliente!==undefined&&permitPermission.cliente!==null&&
       permitPermission.fecha!==''&&permitPermission.fecha!==undefined&&permitPermission.fecha!==null){
        Client.findOne({where:{id:permitPermission.cliente}}).then(clientFound => {
            if(clientFound){
                Service.findOne({where:{id:permitPermission.servicio}}).then(serviceFound => {
                    if(serviceFound){
                        PermitService.create(permitPermission).then(permissionCreated => {
                            if(permissionCreated){
                                res.status(200).send(permissionCreated);
                            }else{
                                res.status(200).send({errorCode: 404, message: 'Error al asignar el permiso.'});
                            }
                        });
                    }else{
                        res.status(200).send({errorCode: 404, message: 'Nos se encontro ningún servicio con ese id.'});
                    }
                });
            }else{
                res.status(200).send({errorCode: 404, message: 'No se encontro ningun cliente con ese id.'});
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
    if(changes.servicio!==null&&changes.servicio!==''&&changes.servicio!==undefined){
        Service.findOne({where:{id:changes.servicio}}).then(serviceFound => {
            if(serviceFound){
                aux2 = true;
            }else{
                aux2 = false;
            }
        });
    }
    if(aux1==true&&aux2==true){
        PermitService.update(changes, {where:{id:id}}).then(permissionUpdated=>{
            if(permissionUpdated){
                PermitService.findOne({where:{id:id}}).then(permissionFound => {
                    res.status(200).send(permissionFound);
                });
            }else{
                res.status(200).send({errorCode: 403, message: 'No se encontro un permiso con ese id.'});
            }
        });
    }else{
        res.status(200).send({errorCode:403, message: 'El servicio no existe.'});
    }
}

function getPermission(req, res){
    let id = req.params.id;
    if(id!==''&&id!==undefined&&id!==null){
        PermitService.findOne({where:{id:id}}).then(permissionFound => {
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
    PermitService.findAll().then(permissionsFound => {
        if(permissionsFound){
            res.status(200).send(permissionsFound);
        }else{
            res.status(200).send({errorCode: 404, message: 'No se han encontrado permisos.'});
        }
    })
}

function getPermissionsByClient(req, res){
    let id = req.params.id;
    if(id!==''&&id!==undefined&&id!==null){
        PermitService.findAll({where:{cliente:id}}).then(permissionFound => {
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
        PermitService.destroy({where:{id:id}}).then(permissionRemoved => {
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

module.exports = { savePermitPermission, editPermission, getPemrissions,getPermission, getPermissionsByClient, deletePermission };

'use strict'

let UserAssigned = require('../models/userAssigned');
let User = require('../models/user');
let Client  = require('../models/client');

function saveUserAssigned(req, res){
    let params = req.body;
    let userAssigned  = {};
    userAssigned.client  = params.client;
    userAssigned.user = params.user;
    if(params.client!==''&&params.client!==null&&params.client!==undefined&&
       params.user!==''&&params.user!==null&&params.user!==undefined){
        User.findOne({where:{id:userAssigned.user}}).then(userFound=>{
            if(userFound){
                Client.findOne({where:{id:userAssigned.client}}).then(clientFound=>{
                    if(clientFound){
                        UserAssigned.create(userAssigned).then(userAssignedCreated=>{
                            if(userAssignedCreated){
                                res.status(200).send(userAssignedCreated);
                            }else{
                                res.status(200).send({errorCode: 404, message: 'El cliente no ha sido asignado.'});
                            }
                        });
                    }else{
                        res.status(200).send({errorCode: 403, message: 'El cliente no coincide.'}); 
                    }
                });
            }else{
                res.status(200).send({errorCode: 403, message: 'El usuario no coincide.'});
            }
        });
    }else{
        res.status(200).send({errorCode: 403, message: 'Ingrese el usuario y cliente a asignar.'});
    }
}

function editUserAssigned(req, res){
    let changes = req.body;
    let relationId = req.params.id;
    let aux1 = true;
    let aux2 = true;
    if(relationId!==''&&relationId!==null&&relationId!==undefined){
        if(changes.client!==''&&changes.client!==null&&changes.client!==undefined){
            Client.findOne({where:{id:changes.client}}).then(clientFound=>{
                if(clientFound){
                    aux1 = true;
                }else{
                    aux2 = false;
                }
            });
        }
        if(changes.user!==''&&changes.user!==null&&changes.user!==undefined){
            User.findOne({where:{id:changes.user}}).then(userFound=>{
                if(userFound){
                    aux2 = true;
                }else{
                    aux2 = false;
                }
            });
        }
        if(aux1==true&&aux2==true){
            UserAssigned.update(changes, {where:{id:relationId}}).then(userAssignedUpadted=>{
                if(userAssignedUpadted){
                    UserAssigned.findOne({where:{id: relationId}}).then(relationFound=>{
                        res.status(200).send(relationFound)
                    });
                }else{
                    res.status(200).send({errorCode:404, message: 'La relación no se ha actualizado.'});
                }
            });
        }else{
            res.status(200).send({errorCode: 404, message: 'El cliente o el usuario no coinciden.'});
        }
    }else{
        res.status(200).send({errorCode: 403, message: 'Ingrese el id de la relación.'});
    }
}

function getUserAssigned(req, res){
    let id = req.params.id;
    if(id!==null&&id!==undefined&&id!==''){
        UserAssigned.findOne({where:{id:id}}).then(userAssigned=>{
            if(userAssigned){
                res.status(200).send(userAssigned)
            }else{
                res.status(200).send({errorCode: 404, message: 'No se ha encontrado ninguna relación.'})
            }
        });
    }else{
        res.status(200).send({errorCode: 403, message: 'Ingrese el id de la relación.'})
    }
}

function getUsersAssigned(req, res){
    UserAssigned.findAll().then(relationFound=>{
        if(relationFound){
            res.status(200).send(relationFound);
        }else{
            res.status(200).send({errorCode: 404, message: 'No se encontraron relaciones'})
        }
    });
}

function deleteUserAssigned(req, res){
    let id = req.params.id;
    if(id!==''&&id!==null&&id!==undefined){
        UserAssigned.destroy({where:{id:id}}).then(relationDestroyed => {
            if(relationDestroyed){
                res.status(200).send({message: 'Usuario eliminado'});
            }else{
                res.status(200).send({errorCode: 404, message: 'No se ha encontrado la relación'});
            }
        });
    }else{
        res.status(200).send({errorCode: 403, message: 'Ingrese el id'});
    }
}

module.exports = { saveUserAssigned, editUserAssigned, getUserAssigned, getUsersAssigned, deleteUserAssigned };
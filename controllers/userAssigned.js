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
    let aux1 = true, aux2 = true;
    if(relationId!==''&&relationId!==null&&relationId!==undefined){
        if(changes.client){
            aux1 = findClient(changes.client);
            console.log(aux2)
        }
        if(changes.user){
            aux2 = findUser(changes.user);
            console.log(aux1)
        }
        if(aux1==true&&aux2==true){
            UserAssigned.update(changes, {where:{id:relationId}}).then(userAssignedUpadted=>{
                if(userAssignedUpadted){
                    UserAssigned.findOne({where:{id: relationId}}).then(relationFound=>{
                        res.status(200).send()
                    })
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

function findUser(userId){
    User.findOne({where:{id:userId}}).then(userFound=>{
        if(userFound){
            return true;
        }else{
            return false;
        }
    });
}

function findClient(clientId){
    Client.findOne({where:{id:clientId}}).then(clientFound=>{
        if(clientFound){
            return true;
        }else{
            return false;
        }
    });
}

module.exports = { saveUserAssigned, editUserAssigned };
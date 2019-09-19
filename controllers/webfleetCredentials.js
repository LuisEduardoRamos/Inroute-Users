'use strict'

let Credentials = require('../models/webfleetCredentials');
let Client = require('../models/client');
let Sequelize = require('sequelize');

const sequelize = new Sequelize("Usuarios1", "sa", "LuisEduardo1997", {
    host: "localhost",
    dialect: "mssql"
});

function saveCredentials(req, res){
    let credentials = {};
    let params = req.body;

    credentials.client = params.client;
    credentials.account = params.account;
    credentials.user = params.user;
    credentials.password = params.password;
    credentials.apiKey = params.apiKey;

    if(params.client!==null&&params.client!==''&&params.client!==undefined&&
       params.account!==null&&params.account!==''&&params.account!==undefined&& 
       params.user!==null&&params.user!==''&&params.user!==undefined&&
       params.password!==null&&params.password!==''&&params.password!==undefined&&
       params.apiKey!==null&&params.apiKey!==''&&params.apiKey!==undefined){
        
        sequelize.sync().then(()=>{
            Credentials.create(credentials).then(credentialsCreated => {
                if(credentialsCreated){
                    res.status(200).send(credentialsCreated);
                }else{
                    res.status(200).send({errorCode:404, message: 'Las credenciales no se han guardado.'});
                }
            });
        });
    }else{
        res.status(200).send({errorCode:403, message:'Ingrese todas las credenciales.'});
    }
}

function editCredentials(req, res){
    let credentialsId = req.params.id;
    let changes = req.body;
    if(credentialsId!==null&&credentialsId!==''&&credentialsId!==undefined){
        Credentials.update(changes, {where:{id: credentialsId}}).then(credentialsUpdated=>{
            if(credentialsUpdated){
                Credentials.findOne({where:{id:credentialsId}}).then(credentialsFound=>{
                    res.status(200).send(credentialsFound);
                });
            }else{
                res.status(200).send({errorCode:404, message: 'Las credenciales no se han modificado'})
            }
        });
    }else{
        res.status(200).send({errorCode: 403, message: 'Ingrese el id de las credenciales.'})
    }
}

function getCredential(req, res){
    let credentialId = req.params.id;
    if(credentialId!==''&&credentialId!==null&&credentialId!==undefined){
        Credentials.findOne({where:{id:credentialId}}).then(credentialFound=>{
            if(credentialId){
                res.status(200).send(credentialFound);
            }else{
                res.status(200).send({errorCode:404, message: 'No se encontrado ninguna credencial'});
            }
        })
    }else{
        res.status(200).send({errorCode: 403, message: 'Introduzca el id del cliente.'});
    }
}

function getCredentialsByClient(req, res){
    let clientId = req.params.id;
    if(clientId!==''&&clientId!==null&&clientId!==undefined){
        Credentials.findAll({where:{client:clientId}}).then(credentialsFound=>{
            if(credentialsFound){
                res.status(200).send(credentialsFound);
            }else{
                res.status(200).send({errorCode:404, message: 'No se ha encontrado ninguna credencial.'})
            }
        });
    }else{
        res.status(200).send({errorCode: 403, message: 'Ingrese el id del cliente.'})
    }
}

function getCredentials(req, res){
    Credentials.findAll().then(credentialsFound=>{
        if(credentialsFound){
            res.status(200).send(credentialsFound);
        }else{
            res.status(200).send({errorCode:404, message: 'No se han encontrado credenciales.'})
        }
    });
}

function login(req, res){
    let params = req.body;
    let user = params.user;
    let password = params.password;
    let account = params.account;

    if(user!==''&&user!==null&&user!==undefined&&
       password!==''&&password!==null&&password!==undefined&&
       account!==''&&account!==null&&account!==undefined){
           Credentials.findOne({where:{user:user, password:password, account:account}}).then(credentialsFound => {
                Client.findOne({where:{id:credentialsFound.client}}).then(clientFound => {
                    res.status(200).send([credentialsFound, clientFound]);
                })
           });
       }else{
           res.status(200).send({errorCode:403, message: 'Ingrese todos los datos'});
       }
}

module.exports = { saveCredentials, editCredentials, getCredential, getCredentialsByClient, getCredentials, login };
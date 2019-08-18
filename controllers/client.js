'use strict'

let Client = require('../models/client');
let Sequelize = require('sequelize');

const sequelize = new Sequelize("usuarios", "sa", "LuisEduardo1997", {
    host: "localhost",
    dialect: "mssql"
});

function saveClient(req, res){
    let client = {}
    let params = req.body;

    client.name = params.name;
    client.email = params.email;
    client.password = params.password;

    console.log(client)
    if(client.name!==null&&client.email!==null&&client.password!==null&&client.name!==''&&client.email!==''
    &&client.password!==''&&client.name!==undefined&&client.email!==undefined&&client.password!==undefined){
        sequelize.sync().then(()=>{
            Client.create(client).then(clientCreated=>{
                if(clientCreated){
                    res.status(200).send(clientCreated)
                }else{
                    res.status(200).send({errorCode: 404, message:'El cliente nos se ha creado'})
                }
            });
        });
    }else{
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
                res.status(200).send({errorCode:404, message:'El cliente no se ha eliminado.'})
            }
        })
    }else{
        res.status(200).send({erroCode:403, message: 'Ingrese el id del cliente.'})
    }
}

module.exports = { saveClient, editClient, getClient, getClients, deleteClient };
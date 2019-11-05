'use strict'

let Service = require('../models/service');
let Sequelize = require('sequelize');
require('dotenv').config()


const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASS, {
    host: "localhost",
    dialect: "mssql"
});

function saveService(req, res){
    let nombre = req.body.nombre;
    if(nombre!==null&&nombre!==''&&nombre!==undefined){
        sequelize.sync().then(()=>{
            Service.create({nombre: nombre}).then(serviceCreated=>{
                if(serviceCreated){
                    res.status(200).send(serviceCreated);
                }else{
                    res.status(200).send({errorCode: 404, message: 'El servicio no se ha creado'});
                }
            });
        });
    }else{
        res.status(200).send({errorCode:403, message: 'Ingrese el nombre del servicio'});
    }
}

function editUser(req, res){
    let id = req.params.id;
    let nombre = req.body.nombre;
    if(nombre!==''&&nombre!==null&nombre!==undefined&&id!==''&&id!==null&&id!==undefined){
        Service.update({nombre:nombre}, {where:{id:id}}).then(serviceUpdated => {
            if(serviceUpdated){
                Service.findOne({where:{id:id}}).then(serviceFound => {
                    res.status(200).send(serviceFound);
                });
            }else{
                res.status(200).send({errorCode: 404, message: 'El servicio no se ha encontrado.'});
            }
        });
    }else{
        res.status(200).send({errorCode:403, message: 'Ingrese el nombre'});
    }
}

function getService(req, res){
    let id = req.params.id;
    if(id!==''&&id!==null&&id!==undefined){
        Service.findOne({where:{id:id}}).then(serviceFound => {
            if(serviceFound){
                res.status(200).send(serviceFound);
            }else{
                res.status(200).send({errorCode: 404, message: 'El servicio no se ha encontrado'});
            }
        });
    }else{
        res.status(200).send({errorCode: 403, message: 'Ingrese el id del servicio.'});
    }
}

function getServices(req, res){
    Service.findAll().then(servicesFound => {
        if(servicesFound){
            res.status(200).send(servicesFound);
        }else{
            res.status(200).send({errorCode: 404, message: 'No hay servicios'});
        }
    });
}

function deleteService(req, res){
    let id = req.params.id;
    if(id!==''&&id!==undefined&&id!==null){
        Service.destroy({where:{id:id}}).then(service=>{
            if(service){
                res.status(200).send({message: 'El servicio se ha eliminado.'});
            }else{
                res.status(200).send({errorCode: 404, message: 'El servucui no se ha encontrado'})
            }
        });
    }else{
        res.status(200).send({errorCode: 403, message: 'Ingrese el id del servicio.'});
    }
}

module.exports = { saveService, editUser, getService, getServices, deleteService };
'use strict'

let Role = require('../models/role');
let Sequelize = require('sequelize');
require('dotenv').config()


const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASS, {
    host: "localhost",
    dialect: "mssql"
});

function saveRole(req, res){
    let role = {};
    let params = req.body;

    role.name = params.name;
    role.description = params.description;
    if(params.name!==null&&params.name!==''&&params.name!==undefined&& 
       params.description!==null&&params.description!==''&&params.description!==undefined){
        sequelize.sync().then(()=>{
            Role.create(role).then(roleCreated => {
                if(roleCreated){
                    res.status(200).send(roleCreated);
                }else{
                    res.status(200).send({errorCode:404, message: 'El rol no se ha guardado.'});
                }
            });
        });
    }else{
        res.status(200).send({errorCode:403, message:'Ingrese todas los campos necesarios.'});
    }
}

function editRole(req, res){
    let roleId = req.params.id;
    let changes = req.body;
    if(roleId!==null&&roleId!==''&&roleId!==undefined){
        Role.update(changes, {where:{id: roleId}}).then(roleUpdated=>{
            if(roleUpdated){
                Role.findOne({where:{id:roleId}}).then(roleFound=>{
                    res.status(200).send(roleFound);
                });
            }else{
                res.status(200).send({errorCode:404, message: 'El rol no se ha modificado'})
            }
        });
    }else{
        res.status(200).send({errorCode: 403, message: 'Ingrese el id del rol.'})
    }
}

function getRol(req, res){
    let RoleId = req.params.id;
    if(RoleId!==''&&RoleId!==null&&RoleId!==undefined){
        Role.findOne({where:{id:RoleId}}).then(roleFound=>{
            if(RoleId){
                res.status(200).send(roleFound);
            }else{
                res.status(200).send({errorCode:404, message: 'No se encontrado ningun rol'});
            }
        })
    }else{
        res.status(200).send({errorCode: 403, message: 'Introduzca el id del rol.'});
    }
}

function getRoles(req, res){
    Role.findAll().then(rolesFound=>{
        if(rolesFound){
            res.status(200).send(rolesFound);
        }else{
            res.status(200).send({errorCode:404, message: 'No se han encontrado credenciales.'})
        }
    });
}
function deleteRole(req, res){
    let id = req.params.id;
    if(id!==''&&id!==undefined&&id!==null){
        Role.destroy({where:{id:id}}).then(roleRemoved => {
            if(roleRemoved){
                res.status(200).send(roleRemoved);
            }else{
                res.status(200).send({errorCode: 404, message: 'No se encontró rol con ese id.'});
            }
        });
    }else{
        res.status(200).send({errorCode: 403, message: 'Ingrese el id del rol.'});
    }
}

module.exports = { saveRole, editRole, getRol, getRoles,deleteRole};
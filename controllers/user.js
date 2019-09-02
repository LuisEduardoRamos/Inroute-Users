"use strict";

let User = require("../models/user");
let Sequelize = require("sequelize");

const sequelize = new Sequelize("usuarios", "sa", "LuisEduardo1997", {
  host: "localhost",
  dialect: "mssql"
});

function saveUser(req, res) {
  let params = req.body;
  let user = {};

  user.name = params.name;
  user.rol = params.rol;
  user.email = params.email;
  user.password = params.password;
  if (
    user.name !== null &&
    user.name !== "" &&
    user.name !== undefined &&
    user.rol !== null &&
    user.rol !== "" &&
    user.rol !== undefined &&
    user.email !== null &&
    user.email !== "" &&
    user.email !== undefined &&
    user.password !== null &&
    user.password !== "" &&
    user.password !== undefined
  ) {
    sequelize.sync().then(() => {
        User.create(user).then(userCreated=>{
            if(userCreated){
                res.status(200).send(userCreated);
            }else{
                res.status(200).send({errorCode:404, message: 'El usuario no se ha guardado.'});
            }
        });
    });
  } else {
    res.status(200).send({ errorCode: 403, message: "Ingrese todos los datos del usuario" });
  }
}

function Login(req, res){
    let email, password;
    let params = req.body;
    email = params.email;
    password = params.password;

    if(email!==''&&email!==null&&email!==undefined&&password!==''&&password!==null&&password!==undefined){
        User.findOne({where:{email:email, password:password}}).then(userFound => {
            if(userFound){
                res.status(200).send(userFound);
            }else{
                res.status(200).send({errorCode: 404, message: 'Las credenciales no coinciden'});
            }
        });
    }else{
        res.status(200).send({errorCode: 403, message: 'Ingrese las credenciales'});
    }
}

function editUser(req, res) {
    let userId = req.params.id;
    let changes = req.body;

    if(userId!==''&&userId!==null&&userId!==undefined){
        User.update(changes, {where:{id:userId}}).then(userUpdated=>{
            if(userUpdated){
                User.findOne({where:{id:userId}}).then(userFound=>{
                    if(userFound){
                        res.status(200).send(userFound);
                    }else{
                        res.status(200).send({errorCode:404, message: 'No se ha encontrado ningún usuario'});
                    }
                });
            }else{
                res.status(200).send({errorCode: 404, message: 'El usuario no se ha modificado'});
            }
        });
    }else{
        res.statu(200).send({errorCode: 403, message: 'Ingrese el id del usuario'});
    }
}

function getUser(req, res){
    let userId = req.params.id;
    if(userId!==null&&userId!==''&&userId!==undefined){
        User.findOne({where:{id: userId}}).then(userFound=>{
            if(userFound){
                res.status(200).send(userFound);
            }else{
                res.status(200).send({errorCode: 404, message: 'El usuario no se ha encontrado.'})
            }
        });
    }else{
        res.status(200).send({errorCode: 403, message: 'Ingrese el id del usuario.'});
    }
}

function getUsers(req, res){
    User.findAll().then(usersFound=>{
        if(usersFound){
            res.status(200).send(usersFound);
        }else{
            res.status(200).send({errorCode:404, message: 'No se han encontrado usuarios'});
        }
    })
}

function deleteUsers(req, res){
    let userId = req.params.id;
    
    if(userId!==''&&userId!==null&&userId!==undefined){
        User.destroy({where:{id:userId}}).then(userRemoved=>{
            if(userRemoved){
                res.status(200).send({message: 'Usuario removido'});
            }else{
                res.status(200).send({errorCode: 404, message: 'Usuario no removido.'});
            }
        });
    }
}

module.exports = { saveUser, editUser, getUser, getUsers, deleteUsers, Login };
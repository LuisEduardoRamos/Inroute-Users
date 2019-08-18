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

module.exports = { saveUser, editUser };
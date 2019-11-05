"use strict";

let User = require("../models/user");
let Sequelize = require("sequelize");
let jwt = require('../services/jwt')
let bcrypt = require('bcrypt-nodejs')
require('dotenv').config()


const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASS, {
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
        bcrypt.hash(params.password, null, null, (err, hash)=>{
            user.password = hash
            User.create(user).then(userCreated=>{
                if(userCreated){
                    res.status(200).send(userCreated);
                }else{
                    res.status(200).send({errorCode:404, message: 'El usuario no se ha guardado.'});
                }
            });
        })
        
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
            res.status(200).send({errorCode:404, message: 'No se han encontrado Usuarios'});
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

function uploadImage(req, res){
    let userId = req.params.id;
    let file_name = 'No subido...';
    if(req.files){
        let file_path = req.files.image.path;
        let file_split = file_path.split('/');
        let file_name = file_split[1];

        let ext_split = file_name.split('.');
        let file_ext = ext_split[1];

        if(file_ext == 'png'|| file_ext == 'jpg'|| file_ext == 'gif'){
            sequelize.sync().then(()=>{
                User.update({image: file_name}, {where:{id: userId}}).then(userUpdated => {
                    if(userUpdated){
                        res.status(200).send({message: 'Imagen actualizada'});
                    }else{
                        res.status(200).send({message: 'El usuario no se ha actualizado'});
                    }
                });
            });  
        }else{
            res.status(200).send({errorCode: 403, message: 'Formato no aceptado'});
        }
    }else{
        res.status(200).send({errorCode: 403, message: 'Ingrese una foto'});
    }
}

function userLogin(req, res){
    let password = req.body.password;
    let email = req.body.email;
    console.log(req.body)

    if(password!==null&&password!==''&&password!==undefined&&email!==null&&email!==''&&email!==undefined){
        User.findOne({where:{email:email}}).then(userFound=>{
            console.log(userFound)
            if(userFound){
                bcrypt.compare(password, userFound.password, (err, checked)=>{
                    if(checked){
                        
                            res.status(200).send({user:userFound, token: jwt.createTokenUser(userFound)})

                    }
                })
            }
            else{
                res.status(200).send({message: 'No se ha encontrado el usuario', errorCode: 404});
            }
        });
    }else{
        res.status(200).send({message: 'Ingrese todas las credenciales.', errorCode: 403});
    }
}

// function getImage(req, res){
//     let imageFile = req.params.imageFile
// }

module.exports = { saveUser, editUser, getUser, getUsers, deleteUsers, uploadImage, userLogin };
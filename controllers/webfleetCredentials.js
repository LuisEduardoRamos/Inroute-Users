'use strict'

let Credentials = require('../models/webfleetCredentials');
let Client = require('../models/client');
let PermitService = require('../models/permitService');
let Permissions = require('../models/permissions');
let Service = require('../models/service');
let axios = require('axios');
let jwt = require('../services/jwt');
let Sequelize = require('sequelize');
let URL_WEBFLEET = 'https://csv.telematics.tomtom.com/extern?lang=en&outputformat=json&useUTF8=True&range_pattern=ud';
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASS, {
    host: "localhost",
    dialect: "mssql"
});

function saveCredentials(req, res){
    let credentials = {};
    let params = req.body;

    credentials.usuario = params.usuario;
    credentials.password = params.password;
    credentials.cliente = params.cliente;
    credentials.role = params.rol;
    console.log(credentials);
    if(params.usuario!==null&&params.usuario!==''&&params.usuario!==undefined&& 
       params.password!==null&&params.password!==''&&params.password!==undefined&&
       params.cliente!==null&&params.cliente!==''&&params.cliente!==undefined&&
       params.rol!==null&&params.rol!==''&&params.rol!==undefined){
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
        Credentials.findAll({where:{cliente:clientId}}).then(credentialsFound=>{
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

async function loginWebfleet(credentials){
    try {
        let { data } = await axios.get(`${URL_WEBFLEET}&action=showContracts&account=${credentials.cuenta}&username=${credentials.usuario}&password=${credentials.password}&apikey=${credentials.apikey}`);
        if(data.errorCode === 1101){
            return {errorCode:404, message: 'Credenciales incorrectas para iniciar sesión en webfleet.'};
        }
        else if(data.errorCode === 8014){
            return{errorCode:404, message: 'El usuario no cuenta con permisos de webfleet connect. Verficar en la plataforma de weblfeet.'};
        }else{
            
            let tokenObj = {
                cuenta: credentials.cuenta,
                usuario: credentials.usuario,
                password: credentials.password,
                apikey: credentials.apikey,
                role: credentials.role
            }
            console.log(tokenObj);
            return {token: jwt.createTokenCredentials(tokenObj)};
        }
    }catch(err){
        return {errorCode:500, message: 'No se pudo realizar el login con webfleet.'};
    }
}
function login(req, res){
    let params = req.body;
    let user = params.usuario;
    let password = params.password;
    let account = params.cuenta;
    let service = params.servicio;

    if(user!==''&&user!==null&&user!==undefined&&
       password!==''&&password!==null&&password!==undefined&&
       account!==''&&account!==null&&account!==undefined &&
       service!==''&&service!==null&&service!==undefined){
        let role=null;
        Client.findOne({where:{cuenta: account}}).then( 
            clientFound =>{
                if(clientFound){
                    let cuenta = clientFound.account;
                    PermitService.findOne({where:{servicio: service, cliente: clientFound.id}}).then(
                       async permitServiceFound => {
                            if(permitServiceFound){
                                if(permitServiceFound.webfleet){
                                    let credenciales = {};
                                    let resObj ={};
                                    Credentials.findOne({where:{cliente: clientFound.id,usuario: user}}).then(
                                        async credFound => {
                                            if(credFound){
                                                credenciales = {
                                                    cuenta: clientFound.cuenta,
                                                    usuario: user,
                                                    password:password ,
                                                    apikey: clientFound.apikey,
                                                    role: credFound.role
                                                }
                                                resObj = await loginWebfleet(credenciales);
                                                console.log(resObj);
                                                res.status(200).send(resObj);
                                            }else{
                                                credenciales = {
                                                    cuenta: clientFound.cuenta,
                                                    usuario: user,
                                                     password:password ,
                                                    apikey: clientFound.apikey,
                                                    role: null
                                                }
                                                resObj = await loginWebfleet(credenciales);
                                                console.log(resObj);
                                                res.status(200).send(resObj);
                                            }
                                        }
                                    )
                                
                                } else{
                                    Credentials.findOne({where:{cliente:clientFound.id, usuario: user }}).then(
                                        credentialsFound => {
                                            if(credentialsFound){
                                                Permissions.findOne({where:{ servicioPermitido:permitServiceFound.servicio,credencial: credentialsFound.id}}).then(
                                                   async permissionFound => {
                                                        if(permissionFound){
                                                            if(credentialsFound.password === password){
                                                                console.log(credentialsFound);
                                                                let credenciales = {
                                                                    cuenta: clientFound.cuenta,
                                                                    usuario: credentialsFound.usuario,
                                                                    password:credentialsFound.password ,
                                                                    apikey: clientFound.apikey,
                                                                    role: credentialsFound.role
                                                                }
                                                                let resObj = await loginWebfleet(credenciales);
                                                                res.status(200).send(resObj);
                                                            }else{
                                                                res.status(200).send({errorCode:404, message: `Contraseña incorrecta.`})  
                                                            }
                                                        }else{
                                                            res.status(200).send({errorCode:403, message:'El usuario no cuenta con permiso para acceder al servico.'})
                                                        }
                                                    })               
                                            }else{
                                                res.status(200).send({errorCode:404, message: `El usuario no se encuentra registrado para usar este servicio.`})  
                                            }
                                        }
                                    )
                                }
                            }else{
                                res.status(200).send({errorCode:404, message: `La cuenta no cuenta con acceso a este servicio. Favor de contactarse con Inroute para más información.`})  
                            }
                        }
                    )
                }else{
                    res.status(200).send({errorCode:404, message: 'No se encontro ningun cliente registrado con esa cuenta.'})
                }
            });
       }else{
           res.status(200).send({errorCode:403, message: 'Ingrese todos los datos'});
       }
}
async function getRoleCredentialsByService(req, res){
    console.log(req.query);
    let role= req.query.rol;
    let service = req.query.servicio;
    try{
        let result = await sequelize.query(`SELECT cuenta, usuario, password, apikey FROM Clientes c JOIN ServiciosPermitidos sp ON c.id = sp.cliente JOIN Credencials cred ON cred.cliente = c.id WHERE cred.role=${role} AND sp.servicio=${service}`);
        if(result[0]){
            res.status(200).send(result[0]);
        }else{
            res.status(200).send([]);
        }
    } catch(err){
        res.status(200).send({errorCode:500, message: 'Ocurrio un error al hacer la consulta'});
    }
}
module.exports = { saveCredentials, editCredentials, getCredential, getCredentialsByClient, getCredentials, login, getRoleCredentialsByService };
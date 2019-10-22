"use strict";
var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "inrouteUsuarios";

exports.createTokenUser = function(user) {
  var payload = {
    id: user.id,
    name: user.name,
    rol: user.rol,
    email: user.email,
    password: user.password,
    image: user.image,
    iat: moment().unix(),
    exp: moment()
      .add(30, "days")
      .unix()
  };

  return jwt.encode(payload, secret);
};

exports.createTokenCredentials = function(credentials) {
  var payload = {
    cuenta: credentials.cuenta,
    usuario: credentials.usuario, 
    password: credentials.password,
    apikey: credentials.apikey,
    iat: moment().unix(),
    exp: moment()
      .add(30, "days")
      .unix()
  };

  return jwt.encode(payload, secret);
};


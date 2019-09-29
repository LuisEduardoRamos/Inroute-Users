"use strict";
var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "inrouteusuarios";

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
    id: credentials.id,
    client: credentials.client,
    account: credentials.account, 
    user: credentials.user,
    password: credentials.password,
    iat: moment().unix(),
    exp: moment()
      .add(30, "days")
      .unix()
  };

  return jwt.encode(payload, secret);
};


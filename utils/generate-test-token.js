'use strict'

var jwt = require('jsonwebtoken')
var config = require('../config')
var tokenOptions = {
  expiresIn: '1h',
  issuer: 'https://maccyber.io'
}
var data = {
  cn: 'Testmann',
  userId: 'Hestmann'
}

var token = jwt.sign(data, config.JWT_SECRET, tokenOptions)

console.log(token)

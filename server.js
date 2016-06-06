'use strict'

var Hapi = require('hapi')
var server = new Hapi.Server()
var config = require('./config')
var validateAPI = require('./lib/validate-api')
var apiService = require('./index')
var Hoek = require('hoek')
var vision
var handlebars
var inert
var yarOptions = {
  storeBlank: false,
  cookieOptions: {
    password: config.YAR_SECRET,
    isSecure: false
  }
}

server.connection({
  port: config.SERVER_PORT
})

server.register(require('hapi-auth-jwt2'), function (err) {
  if (err) {
    console.log(err)
  }

  server.auth.strategy('jwt', 'jwt',
    { key: config.JWT_SECRET,          // Never Share your secret key
      validateFunc: validateAPI,            // validate function defined above
      verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
    })
  server.auth.default('jwt')
})

server.register([
  {
    register: apiService,
    options: {}
  }
], function (err) {
  if (err) {
    console.error('Failed to load a plugin:', err)
  }
})

server.register(require('vision'), function (err) {
  Hoek.assert(!err, err)

  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'views',
    helpersPath: 'views/helpers',
    partialsPath: 'views/partials',
    layoutPath: 'views/layouts',
    layout: false,
    compileMode: 'sync'
  })
})

server.register(require('inert'), function (err) {
  if (err) {
    throw err
  }
  server.route({
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    },
    config: {
      auth: false
    }
  })
})
server.register({
  register: require('yar'),
  options: yarOptions
}, function (err) {
  if (err) {
    console.error('Failed to load a plugin:', err)
  }
})

function startServer () {
  server.start(function () {
    console.log('Server running at:', server.info.uri)
  })
}

function stopServer () {
  server.stop(function () {
    console.log('Server stopped')
  })
}

module.exports.start = startServer

module.exports.stop = stopServer

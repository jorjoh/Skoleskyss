'use strict'

var handlers = require('../handlers')
var Joi = require('joi')

var routes = [
  {
    method: 'GET',
    path: '/table',
    config: {
      auth: false,
      handler: handlers.getapplications,
      description: 'Show the frontpage with tableinformation'
    }
  },
  {
    method: 'GET',
    path: '/tableselected',
    config: {
      auth: false,
      validate: {
        query: 
        {
          from: Joi.string(),
          to: Joi.string()
        }
      },
      handler: handlers.getselectedtimeperiod,
      description: 'Show the frontpage with tableinformation'
    }
  },
  {
    method: 'GET',
    path: '/excel',
    config: {
      auth: false,
      handler: handlers.exportTableToExcel,
      description: 'Send table to XLSX-converter'
    }
  }
]


module.exports = routes

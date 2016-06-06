'use strict'

var handlers = require('../handlers')

var routes = [
  {
    method: 'GET',
    path: '/table',
    config: {
      auth: false,
      handler: handlers.givetablefood,
      description: 'Show the frontpage with tableinformation'
    }
  }, 
  {
    method: 'GET',
    path: '/tableselected',
    config: {
      auth: false,
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
      description: 'Send table to xlsx-converter'
    }
  }
]

module.exports = routes

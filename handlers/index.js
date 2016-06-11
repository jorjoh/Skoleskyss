'use strict'

// var config = require('../config')
var Wreck = require('wreck')
var Handlebars = require('handlebars')
var MomentHandler = require('handlebars.moment')
var Moment = require('moment')
MomentHandler.registerHelpers(Handlebars)

console.log('Start')

var now = Moment()
var day1 = Moment.unix(1318781876);
var day2 = Moment.unix(1318781876);
var twodaysago = Moment().subtract(2, 'days');



// console.log('---------------------------')
// console.log('{{moment d "unix" subtract="days" amount="1000"}}')
// console.log('---------------------------')


function getPublicResponse (request, reply) {
  var message = {
    message: '(Nothing but) Flowers'
    
  }
  reply.view('handlebar-faraexport-test',message)
}

function exportTableToExcel(request, reply) {

  var urlpost = 'http://localhost:3000/'
 // console.log("test-buttom-exportTableToExcel")
  var options = {
    payload: JSON.stringify({'data': request.yar.get('sokerdata')}),
    json: true
  }
  console.log("-----------------------------")
  console.log((request.yar.get('sokerdata')))
  console.log("-----------------------------")

  Wreck.post(urlpost, options, function (err, res, payload) {
    if (err) {
      reply(err)
    } else {
      //console.log(payload)
      reply(payload).header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet').header('Content-Disposition', 'attachment; filename=Tekst.xlsx')
      //reply(payload)
    }
  })
}

function getapplications (request, reply) {
  var wreckOptions = {
    json: true
  }
  var url = 'https://api.skoleskyss.t-fk.no/applications';

  Wreck.get(url, wreckOptions, function (err, data, payload) {
    request.yar.set({'sokerdata': payload})
    //console.log(payload)
    reply.view('handlebar-faraexport-test', payload)
    //reply(payload)
  })
  
}

function getselectedtimeperiod (request, reply) {
  //console.log(Moment(request.query.to).unix())
  var wreckOptions = {
    json: true
  }

  var url = 'https://api.skoleskyss.t-fk.no/applications/'+Moment(request.query.from).unix()+'/'+Moment(request.query.to).unix();
  console.log('--------URL--------')
  console.log(url)
  console.log('-------------------')

  console.log('-------TO---------')
  console.log(request.query.to)
  console.log('-------------------')


  Wreck.get(url, wreckOptions, function (err, data, payload) {
    request.yar.set({'sokerdata': payload})
    //console.log(payload)
    reply.view('handlebar-faraexport-test', payload)
    //reply(payload)
  })

}

module.exports.getPublicResponse = getPublicResponse
//module.exports.getExcelForm = getExcelForm
module.exports.getapplications = getapplications
module.exports.getselectedtimeperiod = getselectedtimeperiod
module.exports.exportTableToExcel = exportTableToExcel


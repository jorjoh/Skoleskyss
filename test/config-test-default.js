'use strict'

var tap = require('tap')
var config = require('../config')

tap.equal(config.SERVER_PORT, 3000, 'Default SERVER_PORT ok')
tap.equal(config.JWT_SECRET, 'And it grew both day and night, Till it bore an apple bright.', 'Default JWT_SECRET ok')

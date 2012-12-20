var proxy = require('netmorphic').http
  , CONFIG = require('./config.json')
  , sample_handlers = require('./handlers.js')
;

var USE_CLUSTER = true

var CUSTOM_HANDLERS = false

var proxy = proxy(CONFIG, CUSTOM_HANDLERS, USE_CLUSTER);  

module.exports = proxy
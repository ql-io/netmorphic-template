var TCProxy = require('../../netmorphic-1').tcp
var config = require('./config.json');
var CUSTOM_HANDLERS = false
var USE_CLUSTER = true;

var servers = TCProxy(config, CUSTOM_HANDLERS, USE_CLUSTER)

module.exports = servers


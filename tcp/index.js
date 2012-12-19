var TCProxy = require('netmorphic').tcp
, monitor = require('netmorphic').monitor;

var Cluster = require('cluster2');
var fs = require('fs');
var internet = require('./handlers');
var config = require('./config.json');

var servers = TCProxy(config, internet, false)

var cluster = new Cluster({
	monitor: monitor
});
	
cluster.listen(function(cb) {
	cb(servers);
});

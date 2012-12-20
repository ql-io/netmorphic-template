var monitor = require('../netmorphic-1').monitor()
var netMorphic_http = require('./http/index')
  , netMorphic_tcp = require('./tcp/index')
  , Cluster = require('cluster2')
;

var servers = []

netMorphic_tcp.forEach(function(e){
	 servers.push(e)
})

servers.push({
	app: netMorphic_http.proxy, 
	port : 3201
})

var cluster = new Cluster({
	monitor: monitor
});
	
cluster.listen(function(cb) {
    cb(servers);
});

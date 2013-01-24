var monitor = require('netmorphic').monitor(3100)
var netmorphic = require('netmorphic').proxy
  , Cluster = require('cluster2')
  , config = require('./config.json')
  , customHandlers = null
  , clustered = true
  , httPort = 3201
  , servers = netmorphic(config, customHandlers, clustered, httPort)
  , cluster = new Cluster({
	  monitor: monitor
    })
;

servers.forEach(function(e){
	var server = e.app;
	server.on('netmorphic-begin-event', function(event){
		console.log(event)
	});
	server.on('netmorphic-end-event', function(event){
		console.log(event)
	})
})
	
cluster.listen(function(cb) {
    cb(servers);
});

var monitor = require('../netmorphic-1').monitor(3100)
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
	
cluster.listen(function(cb) {
    cb(servers);
});

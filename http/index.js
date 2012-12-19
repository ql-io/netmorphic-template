var proxy = require('netmorphic').http
  , monitor = require('netmorphic').monitor()
  , CONFIG = require('./config.json')
  , sample_handlers = require('./handlers.js')
  , Cluster = require('cluster2')
;

var USE_CLUSTER = true;

var CUSTOM_HANDLERS = {
	'fake data': sample_handlers['fake data'],
	'meta data': sample_handlers['meta data'],
	'internet': sample_handlers["internet"],
	'slow internet': sample_handlers['slow internet']
}

var proxy = proxy(CONFIG, CUSTOM_HANDLERS, USE_CLUSTER);  

if(USE_CLUSTER){
	var cluster = new Cluster({
		    port: 3201,
			monitor: monitor
		});
		
	cluster.listen(function(cb) {
			    cb(proxy.server);
			});

}
 else{
	proxy.server.listen(3201)	
}

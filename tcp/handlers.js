/*

	This is a sample custom handler used in the demo

*/


var ps = require('pause-stream');
var through = require('through');
var Time = require('since-when');
var total = 0;
var time = new Time();

var chunks = 0;

exports['internet'] = function(socket, service){
		
	var pause = ps();
	
	socket.pipe(pause.pause());
	
	var buffer = through(function(buf){
		total += buf.length;
		var h = '%%%%%%%%%%%';
		var newline = '\n'
		var str = h + newline;
		str += 'Total Chunks: ' + (chunks++) + newline
		str += 'Chunk size: ' + buf.length + ' BYTES' + newline
		str += 'Total transfer: ' + total + ' BYTES' + newline
		str += Math.floor(total / time.sinceBegin()[0]) + ' BYTES per second (average)' + newline
		str += h + newline;
		console.log(str);
		this.emit('data', buf)
	});
				
	service.connect(3201, '127.0.0.1', function(){
		pause.resume()
	});
	
	socket.pipe(pause).pipe(service).pipe(buffer).pipe(socket)

}

function getLatency(lo, hi) {
    if (lo > hi) {
        var temp = lo;
        lo = hi;
        hi = temp;
    }
    return ((hi - lo) * Math.random()) + lo;
}
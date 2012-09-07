var net = require('net');
var server = net.createServer(function(c) { //'connection' listener
  console.log('logger connected');
  c.on('end', function() {
    console.log('logger disconnected');
  });
  c.on('data', function(data){
	console.log('Log Data:');
	console.log(data.toString('utf8'));
  });
});
server.listen('/tmp/winston.sock', function() { //'listening' listener
  console.log('server bound');
});

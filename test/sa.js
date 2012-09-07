var winston = require('winston');
var Socket = require('../lib/winston-socket.js');

winston.add(winston.transports.Socket, {name : 'bryan'});
console.log("added transport");
setInterval(function() {
	winston.info("Testing sockets", {foo: 'bar', zoo : { 'blah' : 'derr'}});
},
1500);


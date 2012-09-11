/*
 * winston-socket.js: Transport for outputting logs to a unix socket server
 *
 * (C) 2012 Bryan Paluch
 * MIT LICENCE
 */

var util = require('util');
var os = require('os');
var winston = require('winston');
var net = require('net');
/**
 * @constructs Socket
 * @param {object} options hash of options
 */

var Socket = exports.Socket = function (options) {
  options = options || {};


  this.name       = options.name || 'socket'  ;
  this.level      = options.level      || 'info';
  this.silent     = options.silent     || false;

  this.handleExceptions = options.handleExceptions || false;
  this.path  = options.path || '/tmp/winston.sock'; 
  this.timeout = options.timeout || 3000;
  this.connected = false;
  this.client = null;

  this.connect = function() {
		var self = this;
		this.client = net.connect(this.path, function() {
			self.connected = true;
			var output = { 'name' : self.name,
                                   'connected' : true,
                                };
                        this.write(JSON.stringify(output));
		});
		this.client.on('error', function(err){
		setTimeout(function (){
			self.connect();
		},self.timeout);
		});
		this.client.on('end', function(){
		this.connected = false;
		setTimeout(function (){
			self.connect();
		},self.timeout);
		});
	}
  
  this.connect();

};


/** @extends winston.Transport */
util.inherits(Socket, winston.Transport);

winston.transports.Socket = Socket;

/**
 * Core logging method exposed to Winston. Metadata is optional.
 * @function log
 * @member Socket
 * @param level {string} Level at which to log the message
 * @param msg {string} Message to log
 * @param meta {Object} **Optional** Additional metadata to attach
 * @param callback {function} Continuation to respond to when complete.
 */
Socket.prototype.log = function (level, msg, meta, callback) {
if (this.silent || !this.connected) {
    return callback(null, true);
  }

  var self = this,
      output;
  output = { 'name' : self.name, 
	     'level' : level,
	     'msg' : msg,
	     'meta' : meta,
	   };
  this.client.write(JSON.stringify(output));	

  //
  // Emit the `logged` event immediately because the event loop
  //
  self.emit('logged');
  callback(null, true);
};

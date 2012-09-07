#winston socket

A socket transport for winston [winston][0].

For use with a socket server
## Installation


## Usage
``` js
  var winston = require('winston');
  
  require('winston-socket').Socket;
  
  winston.add(winston.transports.Socket, options);
```

The socket server can then be used use to have multi winston loggers talk to it and to then pipe the output to a socket.io or websocket emitter.


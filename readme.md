#winston socket

A socket transport for winston .

For use with a unix socket server
## Installation
  npm install winston-socket

## Usage
``` js
  var winston = require('winston');
  
  require('winston-socket').Socket;
  
  winston.add(winston.transports.Socket, options);

```
Transport by default looks at /tmp/winston.sock for a unix socket. This can be changed with options.path.

Socket server can go up and down without crashing the logger. If the logger gets disconnected it will wait a default 3000 msecs.

options.timeout can adjust the reconnect time.

options.name can rename the logger so if you multiple applications using one unix socket the output will be reasonable.



The socket server can then be used use to have multiple winston loggers talk to it and to then pipe the output to a socket.io or websocket emitter.


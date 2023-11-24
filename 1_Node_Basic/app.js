// Code modules
// http, https, fs, path, os

const http = require('node:http');

const routes = require('./routes');

const PORT = process.env.PORT || 3000;

const server = http.createServer(routes);

server.listen(PORT, () =>
  console.log(`The server is running in the host: http://localhost:${PORT}/`)
);

// Node.js program Lifecycle
/**
 * Node js -> start script
 * ***** parse code, register variables and functions
 * ******* Event loop ----> Keep on running as long as there are event listeners registered
 * process exit
 */

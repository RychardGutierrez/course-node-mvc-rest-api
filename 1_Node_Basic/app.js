// Code modules
// http, https, fs, path, os

const http = require('node:http');
const fs = require('node:fs');

const PORT = process.env.PORT || 3000;

const rqListener = (req, res) => {
  // console.log(req.url, req.method, req.headers);
  //process.exit(0);
  res.setHeader('Content-Type', 'text/html');
  res.statusCode = 200;
  if (req.url === '/') {
    res.write('<h1>Server is on</h1>');
    res.write('<p>write the server is on</p>');
    res.write(
      '<form action="/message" method="POST"> <input type="text" name="message"> <button type="submit">Send Message</button> </form>'
    );
    res.end();
    return;
  }
  if (req.url === '/message' && req.method === 'POST') {
    fs.writeFileSync('message.txt', 'DUMMY', (err) => {
      console.log(err);
    });

    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }

  res.write('<h1>Default message</h1>');
  res.end();
  return;
};

const server = http.createServer(rqListener);

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

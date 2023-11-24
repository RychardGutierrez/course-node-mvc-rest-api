const fs = require('node:fs');

const requestHandler = (req, res) => {
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

  // Post
  if (req.url === '/message' && req.method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });

    // fs.writeFileSync('message.txt', 'DUMMY', (err) => {
    //   console.log(err);
    // });
  }

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<h1>Default message</h1>');
  res.write('</html>');
  res.end();
  return;
};

module.exports = requestHandler;

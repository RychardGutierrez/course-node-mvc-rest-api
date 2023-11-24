const http = require('node:http');
const users = require('./users.json');
const querystring = require('node:querystring');
const PORT = process.env.PORT || 3000;

const routes = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');

  if (req.url === '/users' && req.method === 'POST') {
    let body = '';
    req.on('data', function (data) {
      body += data;

      // Too much POST data, kill the connection!
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6) {
        request.connection.destroy();
      }
    });

    return req.on('end', function () {
      let dataParse = querystring.parse(body);
      users.push({ ...dataParse, id: Math.random(1000) });

      res.statusCode = 302;
      res.setHeader('Location', '/users');
      return res.end();
    });
  }

  if (req.url === '/users' && req.method === 'GET') {
    res.write('<html>');
    res.write('<h1>List Users</h1>');
    res.write('<ul>');
    users.map((user) => {
      res.write(
        `<li>id: ${user.id}, name: ${user.name}, age: ${user.age} </li>`
      );
    });

    res.write('</html>');
    return res.end();
  }

  if (req.url === '/') {
    res.write('<h1>Create a new user</h1>');

    res.write(
      `<form action="/users" method="POST">
          <section>
            <label for='name'> Name: </label> 
            <input type="text" name="name" id="name"> 
          </section>

          <section>
            <label for='age'> Age: </label> 
            <input type="text" name="age" id="age"> 
          </section>
          
          <br/>
          <button type="submit">Create user</button> 
      </form>`
    );
    res.end();
    return;
  }

  res.write('<html>');
  res.write('<h1>Welcome Api users</h1>');
  res.write('</html>');
  res.end();
};

const server = http.createServer(routes);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

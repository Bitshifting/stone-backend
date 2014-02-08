var http = require('http');
http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<a href="https://github.com/akersten/stone-backend">See usage.</a>\n');
                  }).listen(3333, '127.0.0.1');
console.log("Try connecting.");
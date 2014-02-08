/*var http = require('http');
http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<a href="https://github.com/akersten/stone-backend">See usage.</a>\n');
                  }).listen(3333, '127.0.0.1');
console.log("Try connecting.");
*/

var express = require('express');
var app = express();

app.get('/stoneapi/get_local_metadata', function(req, res) {
    res.send('[{"messageID": 1, "rating": 5.0, "lat": 44.4, "lon": 22.2}, {"messageID": 2, "rating": 1.0, "lat": 44.4, "lon": 22.2}, {"messageID": 3, "rating": 3.2, "lat": 44.4, "lon": 22.2}]');
});


app.get('/stoneapi/get_message_content', function(req, res) {
    res.send('[{"messageID": 1, "rating": 5.0, "lat": 44.4, "lon": 22.2}, {"messageID": 2, "rating": 1.0, "lat": 44.4, "lon": 22.2}, {"messageID": 3, "rating": 3.2, "lat": 44.4, "lon": 22.2}]');
});


app.get('/stoneapi/get_local_metadata', function(req, res) {
    res.send('[{"messageID": 1, "rating": 5.0, "lat": 44.4, "lon": 22.2}, {"messageID": 2, "rating": 1.0, "lat": 44.4, "lon": 22.2}, {"messageID": 3, "rating": 3.2, "lat": 44.4, "lon": 22.2}]');
});
        app.listen(3333);
console.log("Listening on 3333");
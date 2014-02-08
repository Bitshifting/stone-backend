/*var http = require('http');
http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<a href="https://github.com/akersten/stone-backend">See usage.</a>\n');
                  }).listen(3333, '127.0.0.1');
console.log("Try connecting.");
*/

var express = require('express');
var app = express();

var mongo = require('mongodb'), format = require('util').format;
var db = new mongo.Db('stonedb', new mongo.Server('localhost', 27017, {}), {safe: true});

app.get('/stoneapi/get_local_metadata/:lat/:lon', function(req, res) {

  db.open(function() {
    db.collection('coll', function(err, collection) {
      if (err) throw err;
      collection.find({}, function(err, cursor) {
        console.log("setting header...");
        res.header("Content-Type", "application/json");
        console.log("doing for-each");
        var jsonstr = '[';
        cursor.each(function(err, doc) {

          if (doc != null) {
             jsonstr +=
              '{' +
              '"messageID":' + doc.messageID +
              '"lat":' + doc.lat +
              '"lon":' + doc.lon +
              '},';


          } else {
            res.end(jsonstr + ']');

          db.close();

          } /*
                   console.log(doc);
          }*/
        });

      });
    });
  });
  //res.send('[{"messageID": 1, "rating": 5.0, "lat": 44.4, "lon": 22.2}, {"messageID": 2, "rating": 1.0, "lat": 44.4, "lon": 22.2}, {"messageID": 3, "rating": 3.2, "lat": 44.4, "lon": 22.2}]');
});


app.get('/stoneapi/get_message_content/:id', function(req, res) {
  //res.send('[{"messageID": 1, "rating": 5.0, "lat": 44.4, "lon": 22.2}, {"messageID": 2, "rating": 1.0, "lat": 44.4, "lon": 22.2}, {"messageID": 3, "rating": 3.2, "lat": 44.4, "lon": 22.2}]');
});

function getNextMessageID() {
  return 6969;
}

app.get('/stoneapi/post_message/:message/:lat/:lon', function(req, res) {
  //res.send('[{"messageID": 1, "rating": 5.0, "lat": 44.4, "lon": 22.2}, {"messageID": 2, "rating": 1.0, "lat": 44.4, "lon": 22.2}, {"messageID": 3, "rating": 3.2, "lat": 44.4, "lon": 22.2}]');
  db.open(function() {
    db.collection('coll', function(err, collection) {
      if (err) throw err;
      collection.insert({messageID: getNextMessageID(), message: req.params.message, lat: req.params.lat, lon: req.params.lon, rating: "it\'s shit!"}, function(err, collection) {
        if (err) throw err;
        console.log("Inserted a message: " + req.params.message + " @ (" + req.params.lat + "," + req.params.lon + ")");
        res.header("Content-Type", "application/json");
        res.end('{"success": true}');
        db.close();
      });
    });
  });
});

app.listen(3333);
console.log("Listening on 3333");
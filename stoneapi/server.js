var express = require('express');
var app = express();

var mongo = require('mongodb'), format = require('util').format, ObjectID = require('mongodb').ObjectID;
var db = new mongo.Db('stonedb', new mongo.Server('localhost', 27017, {}), {safe: true});

/**
 * Get a list of message metadata within a certain radius from the user (based on provided lat/lon).
 */
app.get('/stoneapi/get_local_metadata/:lat/:lon', function(req, res) {

  db.open(function() {
    db.collection('coll', function(err, collection) {
      if (err) throw err;

      //For the local messages, we just want to project out the following:
      // message _id, rating, latitude, longitude
      collection.find({}, {_id:1, rating:1, lat:1, lon:1}, function(err, cursor) {
        if (err) throw err;
        res.header("Content-Type", "application/json");

        cursor.toArray(function (err, documents) {
          if (err) throw err;
          res.end(JSON.stringify(documents));
          db.close();
        });
      });
    });
  });
});


/**
 * Get specific detail about a certain message _id.
 */
app.get('/stoneapi/get_message_content/:messageid', function(req, res) {
  db.open(function() {
    console.log(req.params.id);
    db.collection('coll', function(err, collection) {
      if (err) throw err;
      //Find that specific message _id, and get its message, rating, lat, lon
      collection.find({_id : new ObjectID(req.params.messageid)},  {message:1, rating:1, lat:1, lon:1}, function(err, cursor) {
        if (err) throw err;
        res.header("Content-Type", "application/json");

        cursor.toArray(function (err, documents) {
          if (err) throw err;
          res.end(JSON.stringify(documents));
          db.close();
        });
      });
    });
  });
});



app.get('/stoneapi/post_message/:message/:lat/:lon', function(req, res) {

  db.open(function() {
    db.collection('coll', function(err, collection) {
      if (err) throw err;
      collection.insert({message: req.params.message, lat: req.params.lat, lon: req.params.lon, rating: "it\'s shit!"}, function(err, collection) {
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
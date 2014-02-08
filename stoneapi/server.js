var express = require('express');
var app = express();

var mongo = require('mongodb'), format = require('util').format, ObjectID = require('mongodb').ObjectID;
var db = new mongo.Db('stonedb', new mongo.Server('localhost', 27017, {}), {safe: true});

/**
 * Get a list of message metadata within a certain radius from the user (based on provided lat/lon).
 */
app.get('/stoneapi/message/get/:lat/:lon/:radius', function(req, res) {

  db.open(function() {
    db.collection('coll', function(err, collection) {
      if (err) throw err;

      //For the local messages, we just want to project out the following:
      // message _id, rating, latitude, longitude

      //Need to find upper and lower latitude/longitude bounds, go out about one second
      //in each direction... See http://en.wikipedia.org/wiki/Great-circle_distance
      var latTolerance = 0.0003 * req.params.radius / 100.0 * Math.cos(parseFloat(req.params.lon)); //Normalize latitude distance to about 100 feet
      var lonTolerance = 0.0003 * req.params.radius / 100.0;
      console.log("Selecting from (" + req.params.lat + "," + req.params.lon + ") with tolerance lat: " + latTolerance + " , lon: " + lonTolerance);

      collection.find({ lat: {$gt: (parseFloat(req.params.lat) - latTolerance), $lt: (parseFloat(req.params.lat) + latTolerance)},
                       lon: {$gt: (parseFloat(req.params.lon) - lonTolerance), $lt: (parseFloat(req.params.lon) + lonTolerance)}},
                      {_id:1, message:1, rating:1, lat:1, lon:1, username: 1, uid: 1, private: 1}, function(err, cursor) {
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
 * Posts a message at this position by a user.
 */
app.get('/stoneapi/message/post/:message/:lat/:lon/:username/:recipient', function(req, res) {

  db.open(function() {
    db.collection('coll', function(err, collection) {
      if (err) throw err;
      collection.insert({message: req.params.message, username: req.params.username, lat: parseFloat(req.params.lat), lon: parseFloat(req.params.lon), rating: parseFloat(0.0), recipient: req.params.recipient, private: (req.params.recipient == "public" ? false:true)}, function(err, collection) {
        if (err) throw err;
        console.log("Inserted a message: " + req.params.message + " @ (" + req.params.lat + "," + req.params.lon + ")");
        res.header("Content-Type", "application/json");
        res.end('{"success": true}');
        db.close();
      });
    });
  });
});


/**
 * Updates the rating of a particular message.
 */
app.get('/stoneapi/message/vote/:id/:amount/:dir', function(req, res) {
  db.open(function() {
    db.collection('coll', function(err, collection) {
      if (err) throw err;


  console.log("voting on record " + req.params.id + ", voting it " + req.params.amount + " units in the " + req.params.dir + " direction");
      collection.update({_id : new ObjectID(req.params.id)}, {$inc : {rating: parseFloat(req.params.dir) * parseFloat(req.params.amount)}}, function(err, count) {
          console.log("voting success");
        res.end('{"success": true}');
        db.close();
      });


    });
  });
});


app.get('/stoneapi/account/create/:firstDisplayName', function(req, res) {
  db.open(function() {
    db.collection('users', function(err, collection) {
      if (err) throw err;
      console.log("Attempt to create user " + req.params.firstDisplayName);

      collection.find({username: req.params.firstDisplayName}, function(err, cursor) {
        if (err) throw err;

        if (cursor.count > 0) {
          console.log("Username already claimed.");
          res.end('{"success": false}');
          db.close();
        } else {
          console.log("Adding user.");
          collection.insert({username: req.params.firstDisplayName}, function (err, collection1) {
            if (err) throw err;
            res.end('{"success": true})');
            db.close();
          });
        }
      });
    });
  });
});

/**
 * User account creation
 */
/*
app.get('/stoneapi/account/create/:firstDisplayName', function (req, res) {
  db.open(function() {
    db.collection('users', function(err, collection) {
      if (err) throw err;
      console.log("Attempting to create user " + req.params.firstDisplayName);

      collection.find({username: req.params.firstDisplayName}, function(err, cursor){
        if (err) throw err;

        if (cursor.count() > 0) {
          console.log("Username already exists...");
          res.end('{"success": false}');
        } else {
          console.log("Adding user...");
          collection.insert({username: req.params.firstDisplayName}, function(err, collection1) {
            if (err) throw err;
            res.end('{"success": true}');
            db.close();
          });
        }
      });
    });
  });
});*/

app.listen(3333);
console.log("Listening on 3333");
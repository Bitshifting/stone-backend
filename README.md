stone-backend
=============

Backend for the stone system, using node.js, express.js, and mongoDB

Imitation is the greatest form of flattery


#api
When it's live, hit `[redacted].alexkersten.com`, port 3333, with the following:

### `/stoneapi/get_local_metadata/:lat/:lon/:radius`
Returns a list of local message IDs, within a radius (in feet) of the user, along with the message rating and position.

Returns a JSON like `[{"_id": "123abc456def", "rating": 5.0, "lat": 44.4, "lon": 22.2, "username": "alex"}, {"_id": "123abc456dff", "rating": 1.0, "lat": 44.4, "lon": 22.2, "username": "alex <3"}, {"_id": "123abc456fff", "rating": 3.2, "lat": 44.4, "lon": 22.2, "username": "alex <3<3"}]`

### `/stoneapi/get_message_content/:id`
Returns the content of a message based on its ID.

Returns a JSON like `[{"message": "Look out!", "rating": 5.0, "lat": 44.4, "lon": 22.2, "username": "alex <3"}]`

### `/stoneapi/post_message/:message/:lat/:lon/:username`
Posts a message. For now, the `username` doesn't actually have to match an extant user.

Returns a JSON like `{"success": true}`


### `/stoneapi/vote/:id/:amount/:dir`
Upvotes or downvotes a message. `amount` should be a magnitude, `dir` should be `-1` or `1`

Returns a JSON like `{"success": true}`

# Server setup

* Run `node stoneapi/server.js`

The mongodb database is running in auth mode with no users, so only localhost has access.

# Deps

* node
* express
* mongodb (and node package `mongodb`)

# Todo

* api to create
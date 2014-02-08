stone-backend
=============

Backend for the stone system, using node.js, express.js, and mongoDB

Imitation is the greatest form of flattery


#api
When it's live, hit `[redacted].alexkersten.com`, port 3333, with the following:

### `/stoneapi/get_local_metadata/:lat/:lon/:radius`
Returns a list of local message IDs, within a radius (in feet) of the user, along with the message, message rating and position.

Returns a JSON like `[{"_id": "123abc456def", "message": "blah", "rating": 5.0, "lat": 44.4, "lon": 22.2, "username": "alex"}, {"_id": "123abc456dff", "message": "blah", "rating": 1.0, "lat": 44.4, "lon": 22.2, "username": "alex <3"}, {"_id": "123abc456fff", "message": "blah", "rating": 3.2, "lat": 44.4, "lon": 22.2, "username": "alex <3<3"}]`

### `/stoneapi/get_message_content/:id`
Returns the content of a message based on its ID. Don't have to use this, could do it all at once with the `get_local_metadata` API call.

Returns a JSON like `[{"message": "Look out!", "rating": 5.0, "lat": 44.4, "lon": 22.2, "username": "alex <3"}]`

### `/stoneapi/post_message/:message/:lat/:lon/:username`
Posts a message. For now, the `username` doesn't actually have to match an extant user.

Returns a JSON like `{"success": true}`


### `/stoneapi/vote/:id/:amount/:dir`
Upvotes or downvotes a message. `amount` should be a magnitude, `dir` should be `-1` or `1`

Returns a JSON like `{"success": true}`

### `/stoneapi/account/create/:firstDisplayName`
Assigns a new uid to you - you should keep track of this in your app and tag all of your API requests with it...

Returns a JSON like `{"uid": 987adc765bab3}`

### `/stoneapi/account/update/:displayName`
Changes account properties - like updating a display name when a user changes it, so that other users can search by display name.

Returns a JSON like `{"success": true}`

### `stoneapi/account/lookup/:displayName`
Use this to get the UID of another person in order to follow them. Returns the UID of the account which goes by `displayName` - your app should keep track of this locally, in case the displayName changes - when showing message pins, maybe highlight the ones from followed UIDs in a different color?

Returns a JSON like `{"uid": 8234eab83292}`

# Server setup

* Run `node stoneapi/server.js`

The mongodb database is running in auth mode with no users, so only localhost has access.

# Deps

* node
* express
* mongodb (and node package `mongodb`)

# Todo

* api to create
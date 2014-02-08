stone-backend
=============

Backend for the stone system, using node.js, express.js, and mongoDB

Imitation is the greatest form of flattery


#api
When it's live, hit `[redacted].alexkersten.com`, port 3333, with the following:

## How to use

Create an account with `account/create`, look up your UID with `account/lookup` and keep track of it locally, then you can invoke `account/addfriend`, `account/delfriend`, or even `account/getfriends`.

Message posting is primarily username based, so don't worry about UID for that. (Yet.)

### `/stoneapi/message/get/:lat/:lon/:radius`
Returns a list of local message IDs, within a radius (in feet) of the user, along with the message, message rating and position.

Returns a JSON like `[{"_id": "16'hxx", "message": "blah", "rating": 5.0, "lat": 44.4, "lon": 22.2, "username": "alex"`
`, uid: "16'hxx", "private": false}, ...]`

### `/stoneapi/message/post/:message/:lat/:lon/:username`
### `/:recipient`
Posts a message. `username` must be an extant user created with `account/create`. Recipient is the name of the only person who can see the message - if `public`, this is a public message and everyone can see it.

Returns a JSON like `{"success": true}`

### `/stoneapi/message/vote/:id/:amount/:dir`
Upvotes or downvotes a message. `amount` should be a magnitude, `dir` should be `-1` or `1`

Returns a JSON like `{"success": true}`

### `/stoneapi/account/create/:firstDisplayName`
Assigns a new uid to you - you should look up this UID with `lookup/:displayName` in order to keep track of this in your app and tag all of your API requests with it...

Returns a JSON like `{"success": "true"}`

### `/stoneapi/account/update/:uid/:displayName`
Changes account properties - like updating a display name when a user changes it, so that other users can search by display name.

Returns a JSON like `{"success": true}`

### `stoneapi/account/lookup/:displayName`
Use this to get the UID of another person in order to follow them. Returns the UID of the account which goes by `displayName` - your app should keep track of this locally, in case the displayName changes - when showing message pins, maybe highlight the ones from followed UIDs in a different color?

Returns a JSON like `{"uid": 8234eab83292}`

### `stoneapi/account/addfriend/:uid/:displayName`
Adds user who goes by `displayName` to `uid`'s friends list.

Returns a JSON like `{"success": true}`

### `stoneapi/account/delfriend/:uid/displayName`
Removes user who goes by `displayName` from `uid`'s friends list.

Returns a JSON like `{"success": false}`

### `stoneapi/account/getfriends/:uid`
Gets a list of friend display names and UIDs for `uid`.

Returns a JSON like `[{username: "Abc", uid: "572374bea"}, {username: "Bcd", uid: "74744747bb"}]`

# Server setup

* Run `node stoneapi/server.js`

The mongodb database is running in auth mode with no users, so only localhost has access.

# Deps

* node
* express
* mongodb (and node package `mongodb`)

# Todo

* api to create
stone-backend
=============

Backend for the stone system, using node and express.js


#api
When it's live, hit `[redacted].alexkersten.com`, port 3333, with the following:

## `/stone/api/get_local_metadata`
Returns a list of local message IDs, within a radius (100m) of the user, along with the message rating and position.

Send a JSON like `{"lat": 69.0, "lon": 420.0}`

Returns a JSON like `[{"messageID": 1, "rating": 5.0, "lat": 44.4, "lon": 22.2}, {"messageID": 2, "rating": 1.0, "lat": 44.4, "lon": 22.2}, {"messageID": 3, "rating": 3.2, "lat": 44.4, "lon": 22.2}]`

## `/stone/get_message_content`
Returns the content of a message based on its ID.

Send a JSON like `{"messageID": 1337}`

Returns a JSON like `{"message": "Look out!"}`

## `/stone/post_message`
Posts a message.

Send a JSON like `{"message": "Try Jumping", "lat": 69.0, "lon": 123.4}`

Returns a JSON like `{"success": true}`
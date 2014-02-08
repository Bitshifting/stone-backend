stone-backend
=============

Backend for the stone system, using node.js, express.js, and mongoDB

Imitation is the greatest form of flattery


#api
When it's live, hit `[redacted].alexkersten.com`, port 3333, with the following:

## `/stoneapi/api/get_local_metadata/:lat/:lon`
Returns a list of local message IDs, within a radius (100m) of the user, along with the message rating and position.

Returns a JSON like `[{"messageID": 1, "rating": 5.0, "lat": 44.4, "lon": 22.2}, {"messageID": 2, "rating": 1.0, "lat": 44.4, "lon": 22.2}, {"messageID": 3, "rating": 3.2, "lat": 44.4, "lon": 22.2}]`

## `/stoneapi/get_message_content/:id`
Returns the content of a message based on its ID.

Returns a JSON like `{"message": "Look out!", "rating": 5.0, "lat": 44.4, "lon": 22.2}`

## `/stoneapi/post_message/:message/:lat/:lon`
Posts a message.

Returns a JSON like `{"success": true}`
stone-backend
=============

Backend for the stone system


#api

## `/stone/get_local_metadata(location)`
Returns a list of local message IDs, within a radius (100m) of the user, along with the message rating and position.

Location is a JSON like `{lat: "69.0", lon: "420.0"}`

Returns a value JSON like `{messages: [1, 2, 3, 4]}`

## `/stone/get_message_content(message)`
Returns the content of a message based on its ID.

Message is a JSON like `{messageID: 1337}`

Returns a JSON like `{message: "Look out!"}`

## `/stone/post_message(message)
Posts a message.

Message is a JSON `{message: "Try Jumping", lat: "69.0", lon: "123.4"}`

Returns a JSON like `{success: "true"}`
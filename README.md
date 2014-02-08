stone-backend
=============

Backend for the stone system


#api

## `get_local_metadata(lat, long)`
Returns a list of local message IDs, within a radius (100m) of the user, along with the message rating and position.

## `get_message_content(messageID)`
Returns the content of a message based on its ID.
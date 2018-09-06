const express = require('express');
const router = express.Router({mergeParams: true}) // to merge id

const {createMessage, getMessage, deleteMessage} = require("../handlers/messages")

// prefix in server file:  /api/users/:id/messages
router.route('/').post(createMessage)

/*  ^
POST request to /api/users/5b906f1f250dd023131dcc2a/messages
POST request to /api/users/:id/messages
headers: "Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViOTA2ZjFmMjUwZGQwMjMxMzFkY2MyYSIsInVzZXJuYW1lIjoiTWFnYTIyIiwiaWF0IjoxNTM2MTk1MjI4fQ.7JXvTffBYRVsuoZyvRa6R0tVkEa3dyHK_IROHf47S1U"
body: text:"Good post"
*/

// prefix - /api/users/:id/messages/:message_id
router
  .route("/:message_id")
  .get(getMessage)
  .delete(deleteMessage)

module.exports = router
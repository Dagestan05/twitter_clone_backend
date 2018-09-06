const db = require("../models");

/* 
POST request to /api/users/:id/messages
headers: "Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViOTA2ZjFmMjUwZGQwMjMxMzFkY2MyYSIsInVzZXJuYW1lIjoiTWFnYTIyIiwiaWF0IjoxNTM2MTk1MjI4fQ.7JXvTffBYRVsuoZyvRa6R0tVkEa3dyHK_IROHf47S1U"
body: text:"Good post"
*/

exports.createMessage = async function(req, res, next){
  try{
    let message = await db.Message.create({
      text: req.body.text,
      user: req.params.id //  /api/users/:id/messages
    })
    let foundUser = await db.User.findById(req.params.id);
    //add this message to foundUsers messages array
    foundUser.messages.push(message.id)
    await foundUser.save()
    //send back the message w/ some properties og the author(populate method)
    let foundMessage = await db.Message.findById(message._id).populate('user', {
      username: true,
      profileImageUrl: true
    });
    return res.status(200).json(foundMessage);
    /* response
    "_id": "5b907e4c3d87f228b1ab9bb1",
    "createdAt": "2018-09-06T01:09:32.363Z",
    "text": "Good post",
    "updatedAt": "2018-09-06T01:09:32.363Z",
    "user": {
        "_id": "5b906f1f250dd023131dcc2a",
        "username": "Maga22"
    }

    */
  }catch(err){
    next(err)
  }
};
// GET - /api/users/:id/messages/:message_id
exports.getMessage = async function(req, res, next){
  try {
    let message = await db.Message.find(req.params.message_id);
    return res.status(200).json(message)
  }catch(err) {
    next(err)
  }
};

// DELETE- /api/users/:id/messages/:message_id
exports.deleteMessage = async function(req, res, next){
  try {
    let foundMessage = await db.Message.findById(req.params.message_id);
    await foundMessage.remove();
    return res.status(200).json(foundMessage)
  }catch(err) {
    next(err)
  }
};


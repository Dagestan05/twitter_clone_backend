require("dotenv").load();
var jwt = require("jsonwebtoken");

/* 
POST request to /api/users/5b906f1f250dd023131dcc2a/messages
POST request to /api/users/:id/messages
headers: "Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViOTA2ZjFmMjUwZGQwMjMxMzFkY2MyYSIsInVzZXJuYW1lIjoiTWFnYTIyIiwiaWF0IjoxNTM2MTk1MjI4fQ.7JXvTffBYRVsuoZyvRa6R0tVkEa3dyHK_IROHf47S1U"
body: text:"Good post"
*/

//make sure the user is logged in = Authentication
exports.loginRequired = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];// Bearer kfsb9034048klknvlks39ndsnv
    //decoding the token
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if (decoded) {
        next();
      } else {
        // 401 == unauthorized
        return next({ status: 401, message: "Please Log In First" });
      }
    });
  } catch (err) {
    return next({ status: 401, message: "Please Log In First" });
  }
};

// /api/users/:id/messages
//make sure we get the correct user = Authorization

exports.ensureCorrectUser = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Bearer kfsb9034048klknvlks39ndsnv
    //decoding the token
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      //check the token AND check the id of a user posting the message
      // - /api/users/:id/messages
      if (decoded && decoded.id === req.params.id) {
        return next();
      } else {
        return next({ status: 401, message: "Unauthorized" });
      }
    });
  } catch (err) {
    return next({ status: 401, message: "Unauthorized" });
  }
};

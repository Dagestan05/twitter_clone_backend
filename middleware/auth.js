require("dotenv").load();
var jwt = require("jsonwebtoken");

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

const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signup = async function(req, res, next){
  try {
    //create a user
    let user = await db.User.create(req.body)
    //create a token(signing a token)
    let { id, username, profileImageUrl } = user;//destructured user obj
    let token = jwt.sign({
        //token payload
        id: id,
        username: username,
        profileImageUrl: profileImageUrl
      }, process.env.SECRET_KEY )
    //once finished send it
    return res.status(200).json({ 
      id,
      username,
      profileImageUrl,
      token
    })
  } catch (err) {
    //see what kind of err
    if (err.code === 11000) { // 11000 == fail of validation(mongoose)
      err.message = "Sorry, that email/username is taken"
    }
    //otherwise send back a generic 400
    return next({
      status: 400,
      message: err.message
    })
  }
}



exports.signin = async function(req, res, next){
  try {
    //find a user
    let user = await db.User.findOne({
      email: req.body.email
    });
    //check password match
    let {id, username, profileImageUrl} = user;
    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let token = jwt.sign({
        id,
        username,
        profileImageUrl
      },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        id,
        username,
        profileImageUrl,
        token
      })
    }
  } catch (err) {
    return next({status: 400, message: 'Invalid Email/Password'})
  }
  
  
  // if it matches, log him in 
}
require('dotenv').config();//load all env vars from process.env
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");

const db = require("./models");

const errorHandler = require("./handlers/error")

const authRoutes = require('./routes/auth')
const messagesRoutes = require('./routes/messages')
// auth middlewares
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");

const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(bodyParser.json());

//ROUTES
app.use("/api/auth", authRoutes);
app.use(
  "/api/users/:id/messages",
  loginRequired,
  ensureCorrectUser,
  messagesRoutes
);
//get all messages of a specfic user
app.get("/api/messages", loginRequired, async function(req, res, next) {
  try {
    console.log('tried')
    let messages = await db.Message.find()
        .sort({createdAt: 'desc'})
        .populate("user", {
          username: true,
          profileImageUrl: true
        });
    return res.status(200).json(messages);

  } catch (err) {
    console.log('err', err);
    return next(err)
  }  
})


//Error handler for whole app. Errors for routes
app.use(function(req, res, next){
  let err = new Error("Not Found!") // definig err for all app
  err.status = 404;
  next(err)
})
//Error handler middleware. respods w/ error msg. Will use above error handler
app.use(errorHandler);


//server
app.listen(PORT, function(){
  console.log("Server is started on port ", PORT)
})

require('dotenv').config();//load all env vars from process.env
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");

const errorHandler = require("./handlers/error")

const authRoutes = require('./routes/auth')
const messagesRoutes = require('./routes/messages')

const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

//ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users/:id/messages", messagesRoutes);



//Error handler for whole app
app.use(function(req, res, next){
  let err = new Error("Not Found!") // definig err for all app
  err.status = 404;
  next(err)
})
//Error handler middleware
app.use(errorHandler);


//server
app.listen(PORT, function(){
  console.log("Server is started on port ", PORT)
})

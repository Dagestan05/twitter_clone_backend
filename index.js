const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");

const errorHandler = require("./handlers/error")

const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

//ROUTES

//Error handler
app.use(function(req, res, next){
  let err = new Error("Not Found!")
  err.status = 404;
  next(err)
})
//Error handler middleware
app.use(errorHandler);


//server
app.listen(PORT, function(){
  console.log("Server is started on port ", PORT)
})

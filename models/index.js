const mongoose = require('mongoose')

mongoose.set('debug', true)// for live watch of mongo queries during developnt

mongoose.Promise = Promise // use native es6 promises instead of cbacks

// mongoose.connect("mongodb://localhost:27017/twitterclone", {
mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  useNewUrlParser: true
});


module.exports.User = require("./user")
module.exports.Message = require("./message")
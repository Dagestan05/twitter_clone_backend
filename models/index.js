const mongoose = require('mongoose')

mongoose.set('debug', true)// for live watch of mongo queries

mongoose.Promise = Promise // use native es6 promises instead of cbacks

mongoose.connect("mongodb://localhost/twitterclone", {
  keepAlive: true
});


module.exports.User = require("./user")
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImageUrl: {
    type: String,
  },
  messages:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }]
})

//bcrypt middleware before save of user model
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) { //if paswrd isnt modified, move on, dont hash it again
      return next() // next == save
    }
    //hashing password
    let hashedPassword = await bcrypt.hash(this.password, 10); // 10 == saltRounds
    this.password = hashedPassword; //set the password field of the model 2b hashedPasswrd
    return next() // next == save
  } catch (err) {
    return next(err); // next(err) goes to errorHandler
  }
})
// bcrypt middleware to compare hashed password, we called comparePassword
userSchema.methods.comparePassword = async function (candidatePassword, next) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch; //isMatch returns boolean
  } catch (err) {
    return next(err)
  }  
}

const User = mongoose.model("User", userSchema);

module.exports = User;
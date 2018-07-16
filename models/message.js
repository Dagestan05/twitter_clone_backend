const mongoose = require("mongoose");
const User = require("./user");

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      maxLength: 160
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
  },
  {
    timestamps: true
  }
);


//middlware to remove a message from users messages list
messageSchema.pre("remove", async function(next) {
  try {
    // find a user
    let user = await user.findById(this.user)
    // remove the id of the message from thier messages list
    user.messages.remove(this.id)
    //save that user
    await user.save()
    // return next()
    return
  } catch (err) {
    return next(err)
  }
})


const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
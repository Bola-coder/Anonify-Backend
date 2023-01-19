const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  messageContent: {
    type: String,
    required: [true, "You should provide a message content "],
  },
  timeSent: {
    type: Date,
    default: Date.now,
  },
});

const Messages = mongoose.model("messages", messageSchema);

module.exports = Messages;

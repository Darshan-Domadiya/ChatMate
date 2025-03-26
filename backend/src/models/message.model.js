import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: {
    type: String,
  },
  receiverId: {
    type: String,
  },
  text: {
    type: String,
  },
  image: {
    type: String,
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;

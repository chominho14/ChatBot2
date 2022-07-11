import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  name: String,
  text: String,
});

const Message = mongoose.model("Message", messageSchema);

export default Message;

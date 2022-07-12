import mongoose, { Document } from "mongoose";

export interface MessageInterface extends Document {
  name: string;
  text: string;
}

const messageSchema = new mongoose.Schema<MessageInterface>({
  name: String,
  text: String,
});

const Message = mongoose.model("Message", messageSchema);

export default Message;

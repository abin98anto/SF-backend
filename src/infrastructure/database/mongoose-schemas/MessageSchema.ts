import mongoose, { Schema } from "mongoose";
import { IMessage } from "../../../core/entities/IMessages";

const messageSchema = new Schema<IMessage>({
  conversationId: { type: String, required: true },
  senderId: { type: String, required: true },
  content: String,
  contentType: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
});

export const MessageModel = mongoose.model("Message", messageSchema);

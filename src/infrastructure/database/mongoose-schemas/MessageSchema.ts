import mongoose, { Schema } from "mongoose";
import { IMessage } from "../../../core/entities/IMessages";

const messageSchema = new Schema<IMessage>(
  {
    chatId: { type: String, required: true, ref: "Conversation" },
    senderId: { type: String, required: true, ref: "user" },
    receiverId: { type: String, required: true, ref: "user" },
    content: String,
    contentType: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    timestamp: { type: Date, default: new Date() },
  },
  {
    timestamps: true,
  }
);

export const MessageModel = mongoose.model("Message", messageSchema);

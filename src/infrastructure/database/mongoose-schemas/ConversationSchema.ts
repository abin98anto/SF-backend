import mongoose, { Schema } from "mongoose";
import { IConversation } from "../../../core/entities/IConversation";

const conversationSchema = new Schema<IConversation>(
  {
    participants: { type: [String], required: true },
    lastMessage: { type: String, required: true },
    lastMessageBy: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const ConversationModel = mongoose.model(
  "Conversation",
  conversationSchema
);

import mongoose, { Schema } from "mongoose";
import { IChat } from "../../../core/entities/IChat";

const chatSchema = new Schema<IChat>(
  {
    studentId: { type: String, required: true },
    tutorId: { type: String, required: true },
    courseId: { type: String, required: true },
    messages: [{ type: String, ref: "Message" }],
  },
  {
    timestamps: true,
  }
);

export const ChatModel = mongoose.model("Chat", chatSchema);

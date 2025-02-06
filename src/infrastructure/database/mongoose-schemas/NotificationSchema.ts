import mongoose, { Schema } from "mongoose";
import { INotification } from "../../../core/entities/INotification";

const notificationSchema = new Schema<INotification>({
  userId: { type: String, required: true, ref: "User" },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, required: true },
  onclickUrl: { type: String },
  isRead: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});

export const NotificationModel = mongoose.model(
  "Notification",
  notificationSchema
);

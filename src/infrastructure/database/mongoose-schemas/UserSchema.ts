import mongoose, { Schema, Document } from "mongoose";
import { UserRole } from "../../../core/entities/User";
import { SubscriptionType } from "../../../core/entities/User";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    required: true,
  },
  profilePicture: {
    type: String,
    default: null,
  },
  subscription: {
    type: String,
    enum: Object.values(SubscriptionType),
    default: SubscriptionType.FREE,
    required: true,
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
  },
  otpExpiration: {
    type: Date,
  },
});

export const UserModel = mongoose.model("User", userSchema);

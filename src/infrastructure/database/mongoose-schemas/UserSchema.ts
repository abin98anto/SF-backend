import mongoose, { Schema, Document } from "mongoose";
import { UserRole } from "../../../core/entities/User";
import { SubscriptionType } from "../../../core/entities/User";

const ratingSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comments: {
    type: String,
    default: "",
  },
});

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
  resume: {
    type: String,
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
  ratings: {
    type: [ratingSchema],
    default: [],
  },
  batches: {
    type: Array,
    default: [],
  },
  reviewsTaken: {
    type: Number,
    default: 0,
  },
  sessionsTaken: {
    type: Number,
    default: 0,
  },
});

userSchema.index({ otpExpiration: 1 }, { expireAfterSeconds: 0 });

export const UserModel = mongoose.model("User", userSchema);

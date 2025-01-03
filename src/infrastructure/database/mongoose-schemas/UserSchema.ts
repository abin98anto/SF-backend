import mongoose, { Schema, Document } from "mongoose";
import { UserRole } from "../../../core/entities/User";
import { SubscriptionType } from "../../../core/entities/User";
import { userMessages } from "../../../shared/constants/constants";

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
    default: userMessages.DEFAULT_PIC2,
  },
  subscription: {
    type: String,
    enum: Object.values(SubscriptionType),
    default: SubscriptionType.FREE,
    required: true,
  },
  tutor: {
    type: String,
  },
  resume: {
    type: String,
  },
  tutorRatings: {
    type: [ratingSchema],
    default: [],
  },
  students: {
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
  wallet: {
    type: Number,
    default: 0,
  },
  transactions: {
    type: Array,
    default: [],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
  },
  otpExpiration: {
    type: Date,
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

userSchema.index({ otpExpiration: 1 }, { expireAfterSeconds: 0 });

export const UserModel = mongoose.model("User", userSchema);

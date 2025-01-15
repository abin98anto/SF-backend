import mongoose, { Schema, Document } from "mongoose";
import { SubscriptionType, UserRole } from "../../../core/entities/User";
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

const subscriptionSchema = new Schema({
  name: {
    type: String,
    enum: SubscriptionType,
    required: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  cancelledDate: {
    type: Date,
  },
});

const coursesEnrolledSchema = new Schema({
  courseId: String,
  tutorId: String,
  completedChapters: { type: [String], default: [] },
  progressPercentage: Number,
  startDate: Date,
  EndDate: Date || null,
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
    type: subscriptionSchema,
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
  coursesEnrolled: { type: [coursesEnrolledSchema], default: [] },
});

// userSchema.index({ otpExpiration: 1 }, { expireAfterSeconds: 0 });

export const UserModel = mongoose.model("User", userSchema);

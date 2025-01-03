import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true, default: "" },
    features: { type: [String], required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: 0 },
    discountValidUntil: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const SubscriptionModel = mongoose.model(
  "Subscription",
  subscriptionSchema
);

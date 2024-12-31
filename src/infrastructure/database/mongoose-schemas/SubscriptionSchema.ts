import mongoose, { Schema } from "mongoose";
import { prices } from "../../../core/entities/Subscription";

const subscriptionSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true, default: "" },
    features: { type: [String], required: true },
    pricing: { type: Object, required: true },
    discount: { type: Number, default: 0 },
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

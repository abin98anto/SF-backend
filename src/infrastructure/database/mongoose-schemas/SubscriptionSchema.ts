import mongoose, { Schema } from "mongoose";
import { prices } from "../../../core/entities/Subscription";

const subscriptionSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    features: { type: [] },
    pricing: { type: prices },
    discount: { type: Number },
    discountValidUntil: { type: Date },
  },
  {
    timestamps: true,
  }
);

export const SubscriptionModel = mongoose.model(
  "Subscription",
  subscriptionSchema
);

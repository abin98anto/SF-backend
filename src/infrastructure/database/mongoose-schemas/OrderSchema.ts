import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    userId: { type: String },
    item: { type: String },
    amount: { type: Number },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model("Order", orderSchema);

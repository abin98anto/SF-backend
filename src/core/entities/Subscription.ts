import mongoose from "mongoose";

export default class SubscriptionPlan {
  constructor(
    public name: string = "",
    public description: string = "",
    public features: string[] = [],
    public pricing: number = 0,
    public discount: number = 0,
    public discountValidUntil?: Date,
    public isActive: boolean = true,
    public _id?: mongoose.Types.ObjectId,
    public createdAt?: Date
  ) {}
}

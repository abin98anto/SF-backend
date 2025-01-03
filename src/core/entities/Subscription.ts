import mongoose from "mongoose";

export default class SubscriptionPlan {
  constructor(
    public name: string = "",
    public description: string = "",
    public features: string[] = [],
    public price: number = 0,
    public discountPrice: number = 0,
    public discountValidUntil?: Date,
    public isActive: boolean = true,
    public _id?: mongoose.Types.ObjectId,
    public createdAt?: Date
  ) {}
}

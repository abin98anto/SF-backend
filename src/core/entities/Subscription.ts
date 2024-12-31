import mongoose from "mongoose";

export class prices {
  constructor(public monthly: number, public yearly: number) {}
}

export default class SubscriptionPlan {
  constructor(
    public description: string = "",
    public features: string[] = [],
    public pricing: prices,
    public discount: number = 0,
    public discountValidUntil?: Date,
    public name: string = "",
    public isActive: boolean = true,
    public _id?: mongoose.Types.ObjectId
  ) {}
}

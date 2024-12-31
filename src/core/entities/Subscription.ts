export class prices {
  constructor(public monthly: number, public yearly: number) {}
}

export default class SubscriptionPlan {
  constructor(
    public name: string,
    public description: string,
    public features: string[],
    public pricing: prices,
    public discount?: number,
    public discountValidUntil?: Date,
    public isActive: boolean = true,
    public createdAt: Date = new Date()
  ) {}
}

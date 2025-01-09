export default class Order {
  constructor(
    public userId: string,
    public item: string,
    public amount: number,
    public razorpayPaymentId?: string,
    public razorpayOrderId?: string,
    public status?: "pending" | "completed" | "failed"
  ) {}
}

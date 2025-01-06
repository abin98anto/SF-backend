import { Request, Response } from "express";
import Razorpay from "razorpay";

export class RazorpayController {
  private razorpay: Razorpay;

  constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });
  }

  createRazorpayOrder = async (req: Request, res: Response) => {
    try {
      const { amount, currency } = req.body;

      const options = {
        amount,
        currency,
        receipt: `receipt_${Date.now()}`,
      };

      const order = await this.razorpay.orders.create(options);

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error creating Razorpay order",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
}

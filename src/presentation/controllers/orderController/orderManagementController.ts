import { Request, Response } from "express";
import { CreateOrderUseCase } from "../../../core/use-cases/order/CreateOrderUseCase";
import { GetAllOrderUseCase } from "../../../core/use-cases/order/GetAllOrderUseCase";
import { GetUserOrdersUseCase } from "../../../core/use-cases/order/GetUserOrdersUseCase";
import { Types } from "mongoose";

export class OrderManagementController {
  constructor(
    private createOrder: CreateOrderUseCase,
    private findAllOrder: GetAllOrderUseCase,
    private findUserOrder: GetUserOrdersUseCase
  ) {}

  addOrder = async (req: Request, res: Response) => {
    try {
      const result = await this.createOrder.execute(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  };

  getAllOrders = async (req: Request, res: Response) => {
    try {
      const result = await this.findAllOrder.execute();
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  };

  getUserOrders = async (req: Request, res: Response) => {
    try {
      const userId = req.query.id;

      if (typeof userId === "string" && Types.ObjectId.isValid(userId)) {
        const objectId = new Types.ObjectId(userId);
        const result = await this.findUserOrder.execute(objectId);
        res.status(200).json({ success: true, data: result });
      } else {
        res.status(400).json({ success: false, error: "Invalid user ID" });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  };
}

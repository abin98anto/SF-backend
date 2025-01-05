import { Types } from "mongoose";
import Order from "../../core/entities/Order";
import { OrderRepositoryInterface } from "../../core/interfaces/OrderRepositoryInterface";
import { OrderModel } from "../database/mongoose-schemas/OrderSchema";

export class OrderRepository implements OrderRepositoryInterface {
  async add(order: Order): Promise<Order | null> {
    const newOrder = new OrderModel(order);
    await newOrder.save();
    return newOrder as Order;
  }

  async findAll(): Promise<Order[] | null> {
    return await OrderModel.find();
  }

  async findUserOrders(userId: Types.ObjectId): Promise<Order[] | null> {
    return await OrderModel.find(userId);
  }
}

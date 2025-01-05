import mongoose from "mongoose";
import Order from "../entities/Order";

export interface OrderRepositoryInterface {
  add(order: Order): Promise<Order | null>;
  findAll(): Promise<Order[] | null>;
  findUserOrders(userId: mongoose.Types.ObjectId): Promise<Order[] | null>;
}

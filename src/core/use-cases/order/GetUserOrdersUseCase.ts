import { OrderRepositoryInterface } from "../../interfaces/OrderRepositoryInterface";
import { Types } from "mongoose";

export class GetUserOrdersUseCase {
  constructor(private orderRepository: OrderRepositoryInterface) {}

  async execute(userId: Types.ObjectId) {
    try {
      return await this.orderRepository.findUserOrders(userId);
    } catch (error) {
      console.log("error getting orders of the user", error);
    }
  }
}

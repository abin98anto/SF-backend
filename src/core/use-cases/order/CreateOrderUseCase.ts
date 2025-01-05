import Order from "../../entities/Order";
import { OrderRepositoryInterface } from "../../interfaces/OrderRepositoryInterface";

export class CreateOrderUseCase {
  constructor(private orderRepository: OrderRepositoryInterface) {}

  async execute(order: Order) {
    try {
      return await this.orderRepository.add(order);
    } catch (error) {
      console.log("error creating order", error);
    }
  }
}

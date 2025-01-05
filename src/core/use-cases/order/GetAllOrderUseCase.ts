import { OrderRepositoryInterface } from "../../interfaces/OrderRepositoryInterface";

export class GetAllOrderUseCase {
  constructor(private orderRepository: OrderRepositoryInterface) {}

  async execute() {
    try {
      return await this.orderRepository.findAll();
    } catch (error) {
      console.log("error getting all orders", error);
    }
  }
}

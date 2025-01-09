import { miscMessages } from "../../../shared/constants/constants";
import { OrderRepositoryInterface } from "../../interfaces/OrderRepositoryInterface";

export class GetAllOrderUseCase {
  constructor(private orderRepository: OrderRepositoryInterface) {}

  async execute() {
    try {
      return await this.orderRepository.findAll();
    } catch (error) {
      console.log(miscMessages.GET_ORDER_FAIL, error);
    }
  }
}

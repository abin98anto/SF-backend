import mongoose from "mongoose";
import { SubscriptionRepositoryInterface } from "../../interfaces/SubscriptionRepositoryInterface";

export class GetSubscriptionDetailsUseCase {
  constructor(
    private subscriptionRepository: SubscriptionRepositoryInterface
  ) {}

  async execute(id: mongoose.Types.ObjectId) {
    try {
      return await this.subscriptionRepository.find(id);
    } catch (error) {
      console.log("error getting subscription details", error);
    }
  }
}

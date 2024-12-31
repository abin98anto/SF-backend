import mongoose, { Mongoose } from "mongoose";
import SubscriptionPlan from "../../entities/Subscription";
import { SubscriptionRepositoryInterface } from "../../interfaces/SubscriptionRepositoryInterface";

export class DeleteSubscriptionUseCase {
  constructor(
    private subscriptionRepository: SubscriptionRepositoryInterface
  ) {}

  async execute(id: mongoose.Types.ObjectId) {
    try {
      return await this.subscriptionRepository.delete(id);
    } catch (error) {
      console.log("error deleting subscription", error);
    }
  }
}

import mongoose, { Mongoose } from "mongoose";
import SubscriptionPlan from "../../entities/Subscription";
import { SubscriptionRepositoryInterface } from "../../interfaces/SubscriptionRepositoryInterface";
import { miscMessages } from "../../../shared/constants/constants";

export class DeleteSubscriptionUseCase {
  constructor(
    private subscriptionRepository: SubscriptionRepositoryInterface
  ) {}

  async execute(id: mongoose.Types.ObjectId) {
    try {
      return await this.subscriptionRepository.delete(id);
    } catch (error) {
      console.log(miscMessages.SUBS_DEL_FAIL, error);
    }
  }
}

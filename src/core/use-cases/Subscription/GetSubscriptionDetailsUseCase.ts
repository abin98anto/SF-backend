import mongoose from "mongoose";
import { SubscriptionRepositoryInterface } from "../../interfaces/SubscriptionRepositoryInterface";
import { miscMessages } from "../../../shared/constants/constants";

export class GetSubscriptionDetailsUseCase {
  constructor(
    private subscriptionRepository: SubscriptionRepositoryInterface
  ) {}

  async execute(id: mongoose.Types.ObjectId) {
    try {
      return await this.subscriptionRepository.find(id);
    } catch (error) {
      console.log(miscMessages.SUBS_DETAILS_FAIL, error);
    }
  }
}

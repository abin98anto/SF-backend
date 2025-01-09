import { miscMessages } from "../../../shared/constants/constants";
import SubscriptionPlan from "../../entities/Subscription";
import { SubscriptionRepositoryInterface } from "../../interfaces/SubscriptionRepositoryInterface";

export class UpdateSubscriptionUseCase {
  constructor(
    private subscriptionRepository: SubscriptionRepositoryInterface
  ) {}

  async execute(updates: SubscriptionPlan) {
    try {
      return await this.subscriptionRepository.update(updates);
    } catch (error) {
      console.log(miscMessages.SUBS_UPDATE_FAIL, error);
    }
  }
}

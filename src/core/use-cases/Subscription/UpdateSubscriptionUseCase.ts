import { miscMessages } from "../../../shared/constants/constants";
import SubscriptionPlan from "../../entities/Subscription";
import { SubscriptionRepositoryInterface } from "../../interfaces/SubscriptionRepositoryInterface";

export class UpdateSubscriptionUseCase {
  constructor(
    private subscriptionRepository: SubscriptionRepositoryInterface
  ) {}

  async execute(updates: SubscriptionPlan) {
    try {
      const updatedSubscription = await this.subscriptionRepository.update(
        updates
      );
      if (!updatedSubscription) {
        throw new Error("Subscription not found");
      }
      return updatedSubscription;
    } catch (error) {
      console.log(miscMessages.SUBS_UPDATE_FAIL, error);
      // throw error;
    }
  }
}

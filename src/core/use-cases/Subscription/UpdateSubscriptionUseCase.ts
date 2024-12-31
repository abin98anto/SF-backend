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
      console.log("error updating subscription", error);
    }
  }
}

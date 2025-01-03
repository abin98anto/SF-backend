import SubscriptionPlan from "../../entities/Subscription";
import { SubscriptionRepositoryInterface } from "../../interfaces/SubscriptionRepositoryInterface";

export class AddNewPlanUseCase {
  constructor(
    private subscriptionRepository: SubscriptionRepositoryInterface
  ) {}

  async execute(plan: SubscriptionPlan) {
    try {
      return await this.subscriptionRepository.add(plan);
    } catch (error) {
      console.log("error creating new subscription plan", error);
    }
  }
}

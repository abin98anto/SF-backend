import { SubscriptionRepositoryInterface } from "../../interfaces/SubscriptionRepositoryInterface";
import SubscriptionPlan from "../../entities/Subscription";

export class GetAllSubscriptionUseCase {
  constructor(
    private subscriptionRepository: SubscriptionRepositoryInterface
  ) {}

  async execute(): Promise<SubscriptionPlan[] | null> {
    try {
      return await this.subscriptionRepository.findAll();
    } catch (error) {
      console.log("error fetching all subscriptions", error);
      return null;
    }
  }
}

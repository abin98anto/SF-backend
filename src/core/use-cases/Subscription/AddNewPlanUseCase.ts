import { miscMessages } from "../../../shared/constants/constants";
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
      console.log(miscMessages.SUBS_ADD_FAIL, error);
    }
  }
}

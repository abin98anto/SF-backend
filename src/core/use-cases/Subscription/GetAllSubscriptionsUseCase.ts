import { SubscriptionRepositoryInterface } from "../../interfaces/SubscriptionRepositoryInterface";
import SubscriptionPlan from "../../entities/Subscription";
import { miscMessages } from "../../../shared/constants/constants";

export class GetAllSubscriptionUseCase {
  constructor(
    private subscriptionRepository: SubscriptionRepositoryInterface
  ) {}

  async execute(): Promise<SubscriptionPlan[] | null> {
    try {
      return await this.subscriptionRepository.findAll();
    } catch (error) {
      console.log(miscMessages.SUBS_FETCH_FAIL, error);
      return null;
    }
  }
}

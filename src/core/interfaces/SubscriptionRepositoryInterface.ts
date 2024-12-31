import SubscriptionPlan from "../entities/Subscription";

export interface SubscriptionRepositoryInterface {
  add(plan: SubscriptionPlan): Promise<SubscriptionPlan>;
  update(plan: SubscriptionPlan): Promise<SubscriptionPlan | null>;
  delete(Plan: SubscriptionPlan): Promise<SubscriptionPlan | null>;
}

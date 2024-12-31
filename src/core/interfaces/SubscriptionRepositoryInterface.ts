import mongoose from "mongoose";
import SubscriptionPlan from "../entities/Subscription";

export interface SubscriptionRepositoryInterface {
  add(plan: SubscriptionPlan): Promise<SubscriptionPlan | null>;
  update(plan: SubscriptionPlan): Promise<SubscriptionPlan | null>;
  delete(id: mongoose.Types.ObjectId): Promise<void>;
  find(id: mongoose.Types.ObjectId): Promise<SubscriptionPlan | null>;
  findAll(): Promise<SubscriptionPlan[] | null>;
}

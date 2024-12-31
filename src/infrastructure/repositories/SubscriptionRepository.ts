import SubscriptionPlan from "../../core/entities/Subscription";
import { SubscriptionRepositoryInterface } from "../../core/interfaces/SubscriptionRepositoryInterface";

export class SubscriptionRepository implements SubscriptionRepositoryInterface {
    add(plan: SubscriptionPlan): Promise<SubscriptionPlan> {
        throw new Error("Method not implemented.");
    }
    update(plan: SubscriptionPlan): Promise<SubscriptionPlan | null> {
        throw new Error("Method not implemented.");
    }
    delete(Plan: SubscriptionPlan): Promise<SubscriptionPlan | null> {
        throw new Error("Method not implemented.");
    }
    
}
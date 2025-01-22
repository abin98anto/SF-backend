import mongoose from "mongoose";
import SubscriptionPlan from "../../core/entities/Subscription";
import { SubscriptionRepositoryInterface } from "../../core/interfaces/SubscriptionRepositoryInterface";
import { SubscriptionModel } from "../database/mongoose-schemas/SubscriptionSchema";

export class SubscriptionRepository implements SubscriptionRepositoryInterface {
  async add(plan: SubscriptionPlan): Promise<SubscriptionPlan | null> {
    const newPlan = new SubscriptionModel(plan);
    const savedPlan = await newPlan.save();
    return savedPlan.toObject() as SubscriptionPlan;
  }

  async update(plan: SubscriptionPlan): Promise<SubscriptionPlan | null> {
    const { _id, ...updates } = plan;
    return await SubscriptionModel.findByIdAndUpdate(
      _id,
      { $set: updates },
      { new: true }
    );
  }

  async delete(id: mongoose.Types.ObjectId): Promise<void> {
    const subscription = await SubscriptionModel.findById(id);
    if (subscription) {
      await SubscriptionModel.findByIdAndUpdate(id, {
        isActive: !subscription.isActive,
      });
    }
    return;
  }

  async find(id: mongoose.Types.ObjectId): Promise<SubscriptionPlan | null> {
    return await SubscriptionModel.findById(id);
  }

  async findAll(): Promise<SubscriptionPlan[] | null> {
    return await SubscriptionModel.find();
  }
}

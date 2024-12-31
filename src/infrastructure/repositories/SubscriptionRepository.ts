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
    if (!plan._id) {
      throw new Error("Plan must have a valid _id for update.");
    }

    const updatedPlan = await SubscriptionModel.findByIdAndUpdate(
      plan._id,
      { ...plan },
      { new: true }
    );

    return updatedPlan ? (updatedPlan.toObject() as SubscriptionPlan) : null;
  }

  async delete(id: mongoose.Types.ObjectId): Promise<void> {
    await SubscriptionModel.findByIdAndDelete(id);
    return;
  }

  async find(id: mongoose.Types.ObjectId): Promise<SubscriptionPlan | null> {
    return await SubscriptionModel.findById(id);
  }

  async findAll(): Promise<SubscriptionPlan[] | null> {
    return await SubscriptionModel.find();
  }
}

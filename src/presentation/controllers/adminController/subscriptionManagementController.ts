import mongoose from "mongoose";
import { Request, Response } from "express";
import { AddNewPlanUseCase } from "../../../core/use-cases/Subscription/AddNewPlanUseCase";
import { DeleteSubscriptionUseCase } from "../../../core/use-cases/Subscription/DeleteSubscriptionUseCase";
import { GetAllSubscriptionUseCase } from "../../../core/use-cases/Subscription/GetAllSubscriptionsUseCase";
import { GetSubscriptionDetailsUseCase } from "../../../core/use-cases/Subscription/GetSubscriptionDetailsUseCase";
import { UpdateSubscriptionUseCase } from "../../../core/use-cases/Subscription/UpdateSubscriptionUseCase";

export class SubscriptionManagementController {
  constructor(
    private addSubscription: AddNewPlanUseCase,
    private updateSubscription: UpdateSubscriptionUseCase,
    private deleteSubscription: DeleteSubscriptionUseCase,
    private getAllSubscriptions: GetAllSubscriptionUseCase,
    private getSubscriptionDetails: GetSubscriptionDetailsUseCase
  ) {}

  addNewPlan = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.addSubscription.execute(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  };

  updatePlan = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.query.id as string;
      if (!id) {
        res.status(400).json({ success: false, error: "ID is required" });
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ success: false, error: "Invalid ID format" });
      }

      const objectId = new mongoose.Types.ObjectId(id);
      const result = await this.updateSubscription.execute({
        id: objectId,
        ...req.body,
      });
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  };

  deletePlan = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.query.id as string;
      if (!id) {
        res.status(400).json({ success: false, error: "ID is required" });
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ success: false, error: "Invalid ID format" });
      }

      const objectId = new mongoose.Types.ObjectId(id);
      const result = await this.deleteSubscription.execute(objectId);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  };

  getAllPlans = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.getAllSubscriptions.execute();
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  };

  getPlanDetails = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.query.id as string;
      if (!id) {
        res.status(400).json({ success: false, error: "ID is required" });
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ success: false, error: "Invalid ID format" });
      }

      const objectId = new mongoose.Types.ObjectId(id);
      const result = await this.getSubscriptionDetails.execute(objectId);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  };
}

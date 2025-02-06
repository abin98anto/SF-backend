import { Request, Response } from "express";
import { CreateNotificationUseCase } from "../../../core/use-cases/notification/CreateNotificationUseCase";
import { GetUserNotificationsUseCase } from "../../../core/use-cases/notification/GetUserNotifications";
import { MarkNotificationReadUseCase } from "../../../core/use-cases/notification/MarkNotificationRead";

export class NotificationController {
  constructor(
    private createNotificationUseCase: CreateNotificationUseCase,
    private getUserNotificationsUseCase: GetUserNotificationsUseCase,
    private markNotificationReadUseCase: MarkNotificationReadUseCase
  ) {}

  async createNotification(req: Request, res: Response): Promise<void> {
    try {
      const notification = await this.createNotificationUseCase.execute(
        req.body
      );
      res.status(201).json(notification);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async getUserNotifications(req: Request, res: Response): Promise<void> {
    try {
      const notifications = await this.getUserNotificationsUseCase.execute(
        req.params.userId
      );
      res.status(200).json(notifications);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async markNotificationRead(req: Request, res: Response): Promise<void> {
    try {
      const notification = await this.markNotificationReadUseCase.execute(
        req.params.id
      );
      res.status(200).json(notification);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
}

import { INotification } from "../../core/entities/INotification";
import { NotificationInterface } from "../../core/interfaces/NotificationInterface";
import { NotificationModel } from "../database/mongoose-schemas/NotificationSchema";

export class NotificationRepository implements NotificationInterface {
  create = async (notification: INotification): Promise<INotification> => {
    const newNotification = new NotificationModel(notification);
    await newNotification.save();
    return newNotification;
  };

  findById = async (id: string): Promise<INotification | null> => {
    return await NotificationModel.findById(id);
  };

  findByUserId = async (userId: string): Promise<INotification[]> => {
    return await NotificationModel.find({ userId }).sort({ createdAt: -1 });
  };

  markAsRead = async (id: string): Promise<INotification> => {
    const doc = await NotificationModel.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );
    return doc as INotification;
  };

  delete = async (id: string): Promise<void> => {
    await NotificationModel.findByIdAndDelete(id);
  };

  updateNotification = async (
    id: string,
    notification: Partial<INotification>
  ): Promise<INotification> => {
    const doc = await NotificationModel.findByIdAndUpdate(id, notification, {
      new: true,
    });
    return doc as INotification;
  };
}

import { INotification } from "../entities/INotification";

export interface NotificationInterface {
  create(notification: INotification): Promise<INotification>;
  findById(_id: string): Promise<INotification | null>;
  findByUserId(userId: string): Promise<INotification[]>;
  markAsRead(_id: string): Promise<INotification>;
  delete(_id: string): Promise<void>;
  updateNotification(
    _id: string,
    notification: Partial<INotification>
  ): Promise<INotification>;
}

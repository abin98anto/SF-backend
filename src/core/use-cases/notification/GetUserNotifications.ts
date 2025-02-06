import { INotification } from "../../entities/INotification";
import { NotificationInterface } from "../../interfaces/NotificationInterface";

export class GetUserNotificationsUseCase {
  constructor(private notificationRepository: NotificationInterface) {}

  async execute(userId: string): Promise<INotification[]> {
    return this.notificationRepository.findByUserId(userId);
  }
}

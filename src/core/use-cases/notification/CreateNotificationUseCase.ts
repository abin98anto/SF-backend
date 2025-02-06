import { INotification } from "../../entities/INotification";
import { NotificationInterface } from "../../interfaces/NotificationInterface";

export class CreateNotificationUseCase {
  constructor(private notificationRepository: NotificationInterface) {}

  async execute(
    notification: Omit<INotification, "id">
  ): Promise<INotification> {
    return this.notificationRepository.create(notification);
  }
}

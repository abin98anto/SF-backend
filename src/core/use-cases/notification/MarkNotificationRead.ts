import { INotification } from "../../entities/INotification";
import { NotificationInterface } from "../../interfaces/NotificationInterface";

export class MarkNotificationReadUseCase {
  constructor(private notificationRepository: NotificationInterface) {}

  async execute(id: string): Promise<INotification> {
    return this.notificationRepository.markAsRead(id);
  }
}

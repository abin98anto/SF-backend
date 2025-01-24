import { miscMessages } from "../../../shared/constants/constants";
import { MessageInterface } from "../../interfaces/MessageInterface";

export class MarkAsReadUseCase {
  constructor(private messageRepository: MessageInterface) {}

  async execute(messageId: string) {
    try {
      return this.messageRepository.markAsRead(messageId);
    } catch (error) {
      console.log(miscMessages.MARK_AS_READ);
    }
  }
}

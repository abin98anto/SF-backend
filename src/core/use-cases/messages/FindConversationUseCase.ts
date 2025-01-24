import { miscMessages } from "../../../shared/constants/constants";
import { MessageInterface } from "../../interfaces/MessageInterface";

export class FindConversationUseCase {
  constructor(private messageRepository: MessageInterface) {}

  async execute(conversationId: string) {
    try {
      return await this.messageRepository.findByConversation(conversationId);
    } catch (error) {
      console.log(miscMessages.FND_MSG_USE_CASE, error);
    }
  }
}

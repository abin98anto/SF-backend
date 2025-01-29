import { MessageInterface } from "../../interfaces/chat/MessageInterface";
import { IMessage } from "../../entities/IMessages";

class SendMessageUseCase {
  private messageRepository: MessageInterface;

  constructor(messageRepository: MessageInterface) {
    this.messageRepository = messageRepository;
  }

  async execute(message: IMessage): Promise<void> {
    await this.messageRepository.createMessage(message);
  }
}

export default SendMessageUseCase;

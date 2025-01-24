import { miscMessages } from "../../../shared/constants/constants";
import { IMessage } from "../../entities/IMessages";
import { MessageInterface } from "../../interfaces/MessageInterface";

export class SendMessageUseCase {
  constructor(private messageRepository: MessageInterface) {}

  async execute(data: IMessage) {
    try {
      return await this.messageRepository.create(data);
    } catch (error) {
      console.log(miscMessages.SND_MSG_USE_CASE, error);
    }
  }
}

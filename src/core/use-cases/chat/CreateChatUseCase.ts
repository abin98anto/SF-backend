import { ChatInterface } from "../../interfaces/chat/ChatInterface";
import { IChat } from "../../entities/IChat";

class CreateChatUseCase {
  private chatRepository: ChatInterface;

  constructor(chatRepository: ChatInterface) {
    this.chatRepository = chatRepository;
  }

  async execute(chat: IChat): Promise<IChat> {
    return this.chatRepository.createChat(chat);
  }
}

export default CreateChatUseCase;

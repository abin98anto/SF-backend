import { ChatInterface } from "../../interfaces/chat/ChatInterface";

export class FindUserChatsUseCase {
  constructor(private chatRepository: ChatInterface) {}

  async execute(userId: string) {
    try {
      return await this.chatRepository.getChatsForUser(userId);
    } catch (error) {
      console.log("error in FindUserChatsUseCase", error);
    }
  }
}

import { IChat } from "../../entities/IChat";
import { IMessage } from "../../entities/IMessages";

export interface ChatInterface {
  storeChat(chat: IChat): Promise<void>;

  getChatHistory(chatId: string): Promise<IChat>;

  getChatByCourseAndUser(
    courseId: string,
    userId: string
  ): Promise<IChat | null>;

  storeMessage(message: IMessage): Promise<void>;

  getChatsForUser(userId: string): Promise<IChat[]>;

  
}

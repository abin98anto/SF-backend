import { IChat } from "../../entities/IChat";
import { IMessage } from "../../entities/IMessages";

export interface ChatInterface {
  createChat(chat: IChat): Promise<IChat>;
  getChatHistory(chatId: string): Promise<IChat | null>;
  getChatByCourseAndUser(
    courseId: string,
    userId: string
  ): Promise<IChat | null>;
  storeMessage(message: IMessage): Promise<void>;
  getChatsForUser(userId: string): Promise<IChat[]>;
}

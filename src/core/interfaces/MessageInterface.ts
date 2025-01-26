import { IConversation } from "../entities/IConversation";
import { IMessage } from "../entities/IMessages";

export interface MessageInterface {
  create(message: IMessage): Promise<IMessage>;
  findByConversation(conversationId: string): Promise<IMessage[]>;
  markAsRead(messageId: string): Promise<IMessage | null>;
}

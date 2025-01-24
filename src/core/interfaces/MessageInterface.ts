import { IMessage } from "../entities/IMessages";

export interface MessageInterface {
  create(data: IMessage): Promise<IMessage>;
  findByConversation(conversationId: string): Promise<IMessage[]>;
  markAsRead(messageId: string): Promise<IMessage | null>;
}

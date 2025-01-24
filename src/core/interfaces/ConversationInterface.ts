import { IConversation } from "../entities/IConversation";

export interface ConversationInterface {
  create(participants: string[]): Promise<IConversation>;
  findByParticipants(
    userId: string,
    tutorId: string
  ): Promise<IConversation | null>;
  updateLastMessage(
    conversationId: string,
    messageId: string,
    senderId: string
  ): Promise<IConversation | null>;
  listUserConversations(userId: string): Promise<IConversation[]>;
}

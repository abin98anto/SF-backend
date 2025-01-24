export interface IConversation {
  participants: string[];
  lastMessage?: string;
  lastMessageBy?: string;
  lastMessageId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IConversation {
  participants: string[];
  lastMessage?: string;
  lastMessageBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

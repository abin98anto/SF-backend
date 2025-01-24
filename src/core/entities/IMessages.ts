export type contentType = "text" | "image";

export interface IMessage {
  conversationId: string;
  senderId: string;
  content: string;
  contentType: contentType;
  isRead: boolean;
  createdAt: Date;
}

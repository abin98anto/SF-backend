export type contentType = "text" | "image";

export interface IMessage {
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  contentType: contentType;
  isRead: boolean;
  createdAt: Date;
}

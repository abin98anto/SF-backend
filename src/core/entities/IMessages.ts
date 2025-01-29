export type contentType = "text" | "image";

export interface IMessage {
  chatId: string;
  senderId: string;
  receiverId: string;
  content: string;
  contentType: contentType;
  isRead: boolean;
  timestamp: Date;
}

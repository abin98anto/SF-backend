import { IChat } from "../../../core/entities/IChat";
import { IMessage } from "../../../core/entities/IMessages";
import { ChatInterface } from "../../../core/interfaces/chat/ChatInterface";
import { ChatModel } from "../../database/mongoose-schemas/ChatSchema";

export class ChatRepository implements ChatInterface {
  async storeChat(chat: IChat): Promise<void> {
    const chatDocument = new ChatModel({
      studentId: chat.studentId,
      tutorId: chat.tutorId,
      courseId: chat.courseId,
      messages: chat.messages,
    });

    await chatDocument.save();
  }

  async getChatHistory(chatId: string): Promise<IChat> {
    const chatDocument = await ChatModel.findById(chatId);
    if (!chatDocument) {
      throw new Error("Chat not found");
    }

    return chatDocument;
  }

  async getChatByCourseAndUser(
    courseId: string,
    userId: string
  ): Promise<IChat | null> {
    const chatDocument = await ChatModel.findOne({
      courseId,
      $or: [{ studentId: userId }, { tutorId: userId }],
    });

    if (!chatDocument) {
      return null;
    }

    return chatDocument;
  }

  async storeMessage(message: IMessage): Promise<void> {
    await ChatModel.findByIdAndUpdate(message.chatId, {
      $push: {
        messages: {
          content: message.content,
          senderId: message.senderId,
          receiverId: message.receiverId,
          timestamp: message.timestamp,
        },
      },
    });
  }

  async getChatsForUser(userId: string): Promise<IChat[]> {
    const chatDocuments = await ChatModel.find({
      $or: [{ studentId: userId }, { tutorId: userId }],
    });

    return chatDocuments;
  }
}

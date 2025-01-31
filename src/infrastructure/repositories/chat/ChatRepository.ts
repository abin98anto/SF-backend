import { ChatInterface } from "../../../core/interfaces/chat/ChatInterface";
import { IChat } from "../../../core/entities/IChat";
import { ChatModel } from "../../database/mongoose-schemas/ChatSchema";
import { IMessage } from "../../../core/entities/IMessages";

class ChatRepository implements ChatInterface {
  async createChat(chat: IChat): Promise<IChat> {
    const newChat = new ChatModel(chat);
    return newChat.save();
  }

  async getChatHistory(chatId: string): Promise<IChat | null> {
    return ChatModel.findById(chatId).populate("messages");
  }

  async getChatByCourseAndUser(
    courseId: string,
    userId: string
  ): Promise<IChat | null> {
    return ChatModel.findOne({ courseId, studentId: userId })
      .populate("tutorId")
      .populate("studentId")
      .populate("courseId")
      .populate("messages");
  }

  async storeMessage(message: IMessage): Promise<void> {
    const chat = await ChatModel.findById(message.chatId);
    if (chat) {
      chat.messages.push(message._id as string);
      await chat.save();
    }
  }

  async getChatsForUser(userId: string): Promise<IChat[]> {
    const chats = await ChatModel.find({
      $or: [{ studentId: userId }, { tutorId: userId }],
    })
      .populate("tutorId")
      .populate("studentId")
      .populate("courseId")
      .populate("messages")
      .exec();

    return chats;
  }
}

export default ChatRepository;

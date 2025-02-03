import { MessageInterface } from "../../../core/interfaces/chat/MessageInterface";
import { IMessage } from "../../../core/entities/IMessages";
import { MessageModel } from "../../database/mongoose-schemas/MessageSchema";
import { ChatModel } from "../../database/mongoose-schemas/ChatSchema";
import { miscMessages } from "../../../shared/constants/constants";

class MessageRepository implements MessageInterface {
  async createMessage(message: IMessage): Promise<IMessage> {
    try {
      const savedMessage = await MessageModel.create(message);

      await ChatModel.findByIdAndUpdate(
        message.chatId,
        {
          $push: { messages: savedMessage._id },
        },
        { new: true }
      );

      return savedMessage;
    } catch (error) {
      console.error(miscMessages.MSG_SAVE_FAIL, error);
      throw error;
    }
  }

  async findByConversation(conversationId: string): Promise<IMessage[]> {
    return MessageModel.find({ conversationId });
  }

  async markAsRead(messageId: string): Promise<IMessage | null> {
    const message = await MessageModel.findById(messageId);
    if (message) {
      message.isRead = true;
      await message.save();
      return message;
    }
    return null;
  }

  async getMessagesForChat(chatId: string): Promise<IMessage[]> {
    return MessageModel.find({ chatId })
      .populate("sender")
      .populate("receiver");
  }
}

export default MessageRepository;

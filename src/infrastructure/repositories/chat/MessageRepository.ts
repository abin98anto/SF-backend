import { MessageInterface } from "../../../core/interfaces/chat/MessageInterface";
import { IMessage } from "../../../core/entities/IMessages";
import { MessageModel } from "../../database/mongoose-schemas/MessageSchema";

class MessageRepository implements MessageInterface {
  async createMessage(message: IMessage): Promise<IMessage> {
    const newMessage = new MessageModel(message);
    return newMessage.save();
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
}

export default MessageRepository;

import { IMessage } from "../../core/entities/IMessages";
import { MessageInterface } from "../../core/interfaces/MessageInterface";
import { MessageModel } from "../database/mongoose-schemas/MessageSchema";

export class MessageRepository implements MessageInterface {
  create = async (message: IMessage): Promise<IMessage> => {
    return MessageModel.create({ ...message, isRead: false, deletedFor: [] });
  };

  findByConversation = async (conversationId: string): Promise<IMessage[]> => {
    return MessageModel.find({ conversationId: conversationId });
  };

  markAsRead = async (messageId: string): Promise<IMessage | null> => {
    return MessageModel.findByIdAndUpdate(
      messageId,
      { isRead: true },
      { new: true }
    );
  };
}

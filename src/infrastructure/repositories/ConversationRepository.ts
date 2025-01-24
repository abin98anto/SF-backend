import { IConversation } from "../../core/entities/IConversation";
import { ConversationInterface } from "../../core/interfaces/ConversationInterface";
import { ConversationModel } from "../database/mongoose-schemas/ConversationSchema";

export class ConversationRepository implements ConversationInterface {
  create(participants: string[]): Promise<IConversation> {
    return ConversationModel.create({ participants });
  }

  findByParticipants(
    userId: string,
    tutorId: string
  ): Promise<IConversation | null> {
    return ConversationModel.findOne({
      participants: { $all: [userId, tutorId] },
    });
  }

  updateLastMessage(
    conversationId: string,
    message: string,
    messageId: string,
    senderId: string
  ): Promise<IConversation | null> {
    return ConversationModel.findByIdAndUpdate(
      conversationId,
      {
        lastMessage: message,
        lastMessageBy: senderId,
        lastMessageId: messageId,
      },
      { new: true }
    );
  }

  listUserConversations(userId: string): Promise<IConversation[]> {
    return ConversationModel.find({ participants: userId })
      .populate("lastMessage")
      .populate("lastMessageBy");
  }
}

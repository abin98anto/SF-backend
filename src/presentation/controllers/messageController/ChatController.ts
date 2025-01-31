import { Request, Response } from "express";
import { IChat } from "../../../core/entities/IChat";
import { IMessage } from "../../../core/entities/IMessages";
import CreateChatUseCase from "../../../core/use-cases/chat/CreateChatUseCase";
import SendMessageUseCase from "../../../core/use-cases/chat/SendMessageUseCase";
import MessageRepository from "../../../infrastructure/repositories/chat/MessageRepository";
import ChatRepository from "../../../infrastructure/repositories/chat/ChatRepository";
import { FindUserChatsUseCase } from "../../../core/use-cases/chat/FindUserChatsUseCase";

class ChatController {
  private createChatUseCase: CreateChatUseCase;
  private sendMessageUseCase: SendMessageUseCase;
  private chatRepository: ChatRepository;

  constructor(
    createChatUseCase: CreateChatUseCase,
    sendMessageUseCase: SendMessageUseCase,
    private messageRepository: MessageRepository,
    chatRepository: ChatRepository,
    private findUserChatsUseCase: FindUserChatsUseCase
  ) {
    this.createChatUseCase = createChatUseCase;
    this.sendMessageUseCase = sendMessageUseCase;
    this.chatRepository = chatRepository;
  }

  createChat = async (req: Request, res: Response) => {
    const chat: IChat = req.body;
    try {
      const newChat = await this.createChatUseCase.execute(chat);
      res.status(201).json(newChat);
    } catch (error) {
      res.status(500).json({ message: "Error creating chat" });
    }
  };

  sendMessage = async (req: Request, res: Response) => {
    const message: IMessage = req.body;
    try {
      await this.sendMessageUseCase.execute(message);
      const io = req.app.get("io");
      io.emit("receive_message", message);
      res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error sending message" });
    }
  };

  getMessages = async (req: Request, res: Response) => {
    const chatId = req.params.chatId;
    try {
      const messages = await this.messageRepository.getMessagesForChat(chatId);
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: "Error fetching messages" });
    }
  };

  getUserChats = async (req: Request, res: Response): Promise<void> => {
    try {
      // console.log("ddddddddd", req.body);
      const { courseId, userId } = req.body;
      const result = await this.chatRepository.getChatByCourseAndUser(
        courseId,
        userId
      );
      console.log("user chat result ", result);
      res.status(200).json(result);
    } catch (error) {
      console.log("error fetching user chats", error);
      res.status(500).json({ message: "Error fetching user chats" });
    }
  };

  getChatList = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.query;
      const result = await this.findUserChatsUseCase.execute(userId as string);
      // console.log("user id in chat controllre ", result);
      res.status(200).json(result);
    } catch (error) {
      console.log("error fetching user chats", error);
      res.status(500).json({ message: "Error fetching user chats" });
    }
  };
}

export default ChatController;

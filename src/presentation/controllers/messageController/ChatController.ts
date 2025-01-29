import { Request, Response } from "express";
import { IChat } from "../../../core/entities/IChat";
import { IMessage } from "../../../core/entities/IMessages";
import CreateChatUseCase from "../../../core/use-cases/chat/CreateChatUseCase";
import SendMessageUseCase from "../../../core/use-cases/chat/SendMessageUseCase";

class ChatController {
  private createChatUseCase: CreateChatUseCase;
  private sendMessageUseCase: SendMessageUseCase;

  constructor(
    createChatUseCase: CreateChatUseCase,
    sendMessageUseCase: SendMessageUseCase
  ) {
    this.createChatUseCase = createChatUseCase;
    this.sendMessageUseCase = sendMessageUseCase;
  }

  async createChat(req: Request, res: Response) {
    const chat: IChat = req.body;
    try {
      const newChat = await this.createChatUseCase.execute(chat);
      res.status(201).json(newChat);
    } catch (error) {
      res.status(500).json({ message: "Error creating chat" });
    }
  }

  async sendMessage(req: Request, res: Response) {
    const message: IMessage = req.body;
    try {
      await this.sendMessageUseCase.execute(message);
      res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error sending message" });
    }
  }
}

export default ChatController;

import { Router } from "express";
import ChatRepository from "../../infrastructure/repositories/chat/ChatRepository";
import MessageRepository from "../../infrastructure/repositories/chat/MessageRepository";
import CreateChatUseCase from "../../core/use-cases/chat/CreateChatUseCase";
import SendMessageUseCase from "../../core/use-cases/chat/SendMessageUseCase";
import ChatController from "../controllers/messageController/ChatController";

const chatRouter = Router();

const chatRepository = new ChatRepository();
const messageRepository = new MessageRepository();
const createChatUseCase = new CreateChatUseCase(chatRepository);
const sendMessageUseCase = new SendMessageUseCase(messageRepository);
const chatController = new ChatController(
  createChatUseCase,
  sendMessageUseCase
);

chatRouter.post("/chats", chatController.createChat);
chatRouter.post("/messages", chatController.sendMessage);

export default chatRouter;

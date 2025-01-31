import { Router } from "express";
import ChatRepository from "../../infrastructure/repositories/chat/ChatRepository";
import MessageRepository from "../../infrastructure/repositories/chat/MessageRepository";
import CreateChatUseCase from "../../core/use-cases/chat/CreateChatUseCase";
import SendMessageUseCase from "../../core/use-cases/chat/SendMessageUseCase";
import ChatController from "../controllers/messageController/ChatController";
import { FindUserChatsUseCase } from "../../core/use-cases/chat/FindUserChatsUseCase";

const chatRouter = Router();

const chatRepository = new ChatRepository();
const messageRepository = new MessageRepository();
const createChatUseCase = new CreateChatUseCase(chatRepository);
const sendMessageUseCase = new SendMessageUseCase(messageRepository);
const findUserChatsUseCase = new FindUserChatsUseCase(chatRepository);

const chatController = new ChatController(
  createChatUseCase,
  sendMessageUseCase,
  messageRepository,
  chatRepository,
  findUserChatsUseCase
);

// chatRouter.post("/chats", chatController.createChat);
// chatRouter.post("/messages", chatController.sendMessage);
// chatRouter.get("/chats/:chatId/messages", chatController.getMessages);

chatRouter.post("/send-message", chatController.sendMessage);
chatRouter.post("/user-chat", chatController.getUserChats);
chatRouter.get("/chats-list", chatController.getChatList);

export default chatRouter;

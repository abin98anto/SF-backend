import { Server } from "socket.io";
import ChatRepository from "../repositories/chat/ChatRepository";
import MessageRepository from "../repositories/chat/MessageRepository";

const chatRepository = new ChatRepository();
const messageRepository = new MessageRepository();

const socket = new Server();

socket.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("create-chat", async (data) => {
    const chat = await chatRepository.createChat(data);
    socket.emit("chat-created", chat);
  });

  socket.on("send-message", async (data) => {
    await messageRepository.createMessage(data);
    socket.emit("message-sent", data);
  });
});

export default socket;

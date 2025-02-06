// import { Server } from "socket.io";
// import ChatRepository from "../repositories/chat/ChatRepository";
// import MessageRepository from "../repositories/chat/MessageRepository";

// const chatRepository = new ChatRepository();
// const messageRepository = new MessageRepository();

// const socket = new Server();

// socket.on("connection", (socket) => {
//   console.log("Client connected");

//   socket.on("create-chat", async (data) => {
//     const chat = await chatRepository.createChat(data);
//     socket.emit("chat-created", chat);
//   });

//   socket.on("send-message", async (data) => {
//     await messageRepository.createMessage(data);
//     socket.emit("message-sent", data);
//   });
// });

// export default socket;

import { Server } from "socket.io";
import { Server as HTTPServer } from "http";
import { IMessage } from "../../core/entities/IMessages";

export const initializeSocket = (httpServer: HTTPServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:4000"],
      methods: ["GET", "POST"],
      credentials: true,
      allowedHeaders: ["my-custom-header"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("send_message", (message: IMessage) => {
      socket.broadcast.emit("receive_message", message);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });

    socket.on("video-call-invitation", (data) => {
      socket.to(data.to).emit("video-call-invitation", {
        roomID: data.roomID,
        from: data.from,
        fromName: data.fromName,
      });
    });

    socket.on("video-call-rejected", (data) => {
      socket.to(data.to).emit("video-call-rejected");
    });
  });

  return io;
};

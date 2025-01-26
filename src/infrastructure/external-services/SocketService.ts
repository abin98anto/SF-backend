import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { IMessage } from "../../core/entities/IMessages";
import { SendMessageUseCase } from "../../core/use-cases/chat/SendMessageUseCase";
import { MarkAsReadUseCase } from "../../core/use-cases/chat/MarkAsReadUseCase";

export class SocketService {
  private io: Server;

  constructor(
    httpServer: HttpServer,
    private sendMessageUseCase: SendMessageUseCase,
    private markAsReadUseCase: MarkAsReadUseCase
  ) {
    this.io = new Server(httpServer, {
      cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
      },
    });

    this.initializeSocketEvents();
  }

  private initializeSocketEvents() {
    this.io.on("connection", (socket: Socket) => {
      console.log("New client connected");

      // Join user's personal room
      socket.on("join", (userId: string) => {
        socket.join(userId);
      });

      // Handle sending a message
      socket.on("send_message", async (messageData: IMessage) => {
        try {
          const savedMessage = await this.sendMessageUseCase.execute(
            messageData
          );

          // Emit to receiver
          this.io
            .to(messageData.receiverId)
            .emit("receive_message", savedMessage);
        } catch (error) {
          socket.emit("message_error", error);
        }
      });

      // Mark messages as read
      socket.on("mark_read", async (messageId: string) => {
        try {
          const updatedMessage = await this.markAsReadUseCase.execute(
            messageId
          );
          socket.emit("message_read_confirmation", updatedMessage);
        } catch (error) {
          socket.emit("message_read_error", error);
        }
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  }

  // Method to get socket.io instance if needed
  getIO() {
    return this.io;
  }
}

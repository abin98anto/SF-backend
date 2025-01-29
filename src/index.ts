import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { config } from "./config/env";
import { DatabaseConnection } from "./infrastructure/database/connection";
import { miscMessages } from "./shared/constants/constants";
import { errorHandler } from "./presentation/middleware/errorMiddleware";
import userRouter from "./presentation/routes/userRoutes";
import tutorRouter from "./presentation/routes/tutorRoutes";
import adminRouter from "./presentation/routes/adminRoutes";
import cron from "./shared/utils/subscriptionJob";
// import {
//   requestLogger,
//   responseLogger,
// } from "./presentation/middleware/loggerMiddleware";
import orderRouter from "./presentation/routes/orderRoutes";
import { createServer } from "http";
import socket from "./infrastructure/external-services/SocketService";
import chatRouter from "./presentation/routes/chatRoutes";

dotenv.config();

const app = express();

const server = createServer(app);
socket.listen(server);

app.use(cors(config.corsOptions));
app.use(cookieParser());
app.use(express.json());

const databaseConnection = new DatabaseConnection(config.database.uri);

// app.use(requestLogger);
app.use("/", userRouter);
app.use("/tutor", tutorRouter);
app.use("/admin", adminRouter);
app.use("/order", orderRouter);
app.use("/m", chatRouter);
// app.use(responseLogger);
app.use(errorHandler);

databaseConnection.connect().then(() => {
  server.listen(config.port, () => {
    console.log(miscMessages.SERVER_STARTED);
  });

  cron.start();
  console.log("Subscription cron job started.");
});

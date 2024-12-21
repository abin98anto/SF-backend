import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { config } from "./config/env";
import { DatabaseConnection } from "./infrastructure/database/connection";
import { miscMessages } from "./shared/constants/constants";
import { errorHandler } from "./presentation/middleware/errorMiddleware";
import userRouter from "./presentation/routes/userRoutes";
// import tutorRouter from "./presentation/routes/tutorRoutes";
import adminRouter from "./presentation/routes/adminRoutes";
import {
  requestLogger,
  responseLogger,
} from "./presentation/middleware/loggerMiddleware";

dotenv.config();

const app = express();

app.use(cors(config.corsOptions));
app.use(cookieParser());
app.use(express.json());

const databaseConnection = new DatabaseConnection(config.database.uri);

app.use(requestLogger);
app.get("/", (req, res) => {
  res.send("Hello, Worlds!");
});
app.use("/", userRouter);
// app.use("/tutor", tutorRouter);
app.use("/admin", adminRouter);
app.use(responseLogger);
app.use(errorHandler);

databaseConnection.connect().then(() => {
  app.listen(config.port, () => {
    console.log(miscMessages.SERVER_STARTED);
  });
});

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { DatabaseConnection } from "./infrastructure/database/connection";
import { miscMessages } from "./shared/constants/constants";
import userRouter from "./presentation/routes/userRoutes";
import { verifyAccessToken } from "./presentation/middleware/authMiddleware";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const dbURI = process.env.MONGODB_URI || "";

const databaseConnection = new DatabaseConnection(dbURI);

app.get(
  "/",
  (req, res, next) => verifyAccessToken(req, res, next),
  (req, res) => {
    res.send("Hello, Worlds!");
  }
);

app.use("/", userRouter);

databaseConnection.connect().then(() => {
  app.listen(PORT, () => {
    console.log(miscMessages.SERVER_STARTED);
  });
});

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { DatabaseConnection } from "./infrastructure/database/connection";
import { miscMessages } from "./shared/constants/constants";
import userRouter from "./presentation/routes/userRoutes";
import { verifyAccessToken } from "./presentation/middleware/authMiddleware";
import tutorRouter from "./presentation/routes/tutorRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const dbURI = process.env.MONGODB_URI || "";

const databaseConnection = new DatabaseConnection(dbURI);

const corsOptions = {
  origin: ["http://localhost:5173/"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

app.get(
  "/",
  (req, res, next) => verifyAccessToken(req, res, next),
  (req, res) => {
    res.send("Hello, Worlds!");
  }
);

app.use("/", userRouter);
app.use("/tutor", tutorRouter);

databaseConnection.connect().then(() => {
  app.listen(PORT, () => {
    console.log(miscMessages.SERVER_STARTED);
  });
});

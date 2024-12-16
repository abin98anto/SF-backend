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

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      const allowedOrigins = ["http://localhost:5173"];
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const dbURI = process.env.MONGODB_URI || "";

const databaseConnection = new DatabaseConnection(dbURI);

const corsOptions = {
  origin: "http://localhost:5173", // Remove the trailing slash
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"], // Add allowed headers
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

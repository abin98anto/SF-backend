import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { DatabaseConnection } from "./infrastructure/database/connection";
import { corsDetails, miscMessages } from "./shared/constants/constants";
import userRouter from "./presentation/routes/userRoutes";
import tutorRouter from "./presentation/routes/tutorRoutes";
import adminRouter from "./presentation/routes/adminRoutes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      const allowedOrigins = [corsDetails.FE_URL];
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error(corsDetails.ERROR));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const dbURI = process.env.MONGODB_URI || "";
const databaseConnection = new DatabaseConnection(dbURI);

app.get("/", (req, res) => {
  res.send("Hello, Worlds!");
});

app.use("/", userRouter);
app.use("/tutor", tutorRouter);
app.use("/admin", adminRouter);

databaseConnection.connect().then(() => {
  app.listen(PORT, () => {
    console.log(miscMessages.SERVER_STARTED);
  });
});

import express from "express";
import dotenv from "dotenv";

import { DatabaseConnection } from "./infrastructure/database/connection";
import { messages } from "./shared/constants/miscErrors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const dbURI = process.env.MONGODB_URI || "";
const databaseConnection = new DatabaseConnection(dbURI);

app.get("/", (req, res) => {
  res.send("Hello, Worlds!");
});

databaseConnection.connect().then(() => {
  app.listen(PORT, () => {
    console.log(messages.SERVER_STARTED);
  });
});
import express from "express";
import dotenv from "dotenv";

import { messages } from "./shared/constants/miscErrors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Worlds!");
});

app.listen(PORT, () => {
  console.log(messages.SERVER_STARTED);
});

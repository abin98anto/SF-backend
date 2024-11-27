import { configDotenv } from "dotenv";
configDotenv();

console.log("hello world", process.env.JWT_REFRESH_EXPIRY);
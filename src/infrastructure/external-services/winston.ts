import winston from "winston";
import path from "path";

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  if (typeof message === "object") {
    return `${timestamp} ${level}: ${JSON.stringify(message, null, 2)}`;
  }
  return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(process.cwd(), "logs", "app.log"),
    }),
  ],
});

export default logger;

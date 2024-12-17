import dotenv from "dotenv";
import { corsDetails } from "../shared/constants/constants";

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  database: {
    uri: process.env.MONGODB_URI || "",
  },
  corsOptions: {
    origin: function (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void
    ) {
      if (!origin) return callback(null, true);

      const allowedOrigins = [corsDetails.FE_URL];
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(corsDetails.ERROR));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  },
  environment: process.env.NODE_ENV || "development",
};

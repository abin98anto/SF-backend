import mongoose from "mongoose";
import { handleExpiredSubscriptions } from "../core/use-cases/Subscription/ExpiredSubsUseCase";

import dotenv from "dotenv";
dotenv.config();
const dbURI = process.env.MONGODB_URI as string;

const testJob = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(dbURI, {
      serverSelectionTimeoutMS: 30000,
    });

    console.log("Connected to MongoDB Atlas!");
    console.log("Manually testing expired subscriptions handling...");

    await handleExpiredSubscriptions();

    console.log("Test completed.");
  } catch (error) {
    console.error("Error during test:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

testJob();

import mongoose from "mongoose";
import { UserModel } from "../infrastructure/database/mongoose-schemas/UserSchema";

import dotenv from "dotenv";
dotenv.config();
const dbURI = process.env.MONGODB_URI as string;

const testQuery = async () => {
  try {
    await mongoose.connect(dbURI, {
      serverSelectionTimeoutMS: 30000,
    });

    console.log("Connected to MongoDB Atlas!");

    const currentDate = new Date();
    console.log("Querying for expired subscriptions...");
    const expiredSubscriptions = await UserModel.find({
      "subscription.endDate": { $lte: currentDate },
      "subscription.cancelledDate": { $exists: false },
      role: "user",
    }).lean();

    console.log("Expired subscriptions:", expiredSubscriptions);
  } catch (error) {
    console.error("Error executing query:", error);
  } finally {
    mongoose.disconnect();
  }
};

testQuery();

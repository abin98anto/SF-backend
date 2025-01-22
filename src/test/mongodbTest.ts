import mongoose from "mongoose";
import { UserModel } from "../infrastructure/database/mongoose-schemas/UserSchema";

const dbURI = "mongodb+srv://abin:2%40Teachers@skillforge.dk3au.mongodb.net/";

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

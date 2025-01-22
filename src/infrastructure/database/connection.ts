import mongoose from "mongoose";
import { databaseMessages } from "../../shared/constants/constants";

export class DatabaseConnection {
  private dbURI: string;

  constructor(dbURI: string) {
    this.dbURI = dbURI;
  }

  async connect(): Promise<void> {
    try {
      await mongoose.connect(this.dbURI, {
        serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      });
      console.log(databaseMessages.CONNECTION_SUCCESSFUL);
      
      // Ensure the database connection is stable before proceeding
      const dbStatus = mongoose.connection.readyState; // 1 = connected
      if (dbStatus !== 1) {
        throw new Error("MongoDB connection is not stable.");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(databaseMessages.CONNECTION_ERROR, error.message);
        process.exit(1);
      }
    }
  }

  async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log(databaseMessages.CONNECTION_DISCONNECTED);
    } catch (error) {
      if (error instanceof Error) {
        console.error(databaseMessages.CONNECTION_ERROR, error);
      }
    }
  }
}

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUri = process.env.DB_URI;

export const connectDB = async () => {
  try {
    if (!dbUri) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }
    await mongoose.connect(dbUri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

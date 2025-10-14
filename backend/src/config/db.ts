import mongoose from "mongoose";
import { ENV } from "./env";

export async function connectDB() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(ENV.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

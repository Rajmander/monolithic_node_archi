import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

const db = async () => {
  try {
    console.log("Connecting to DB:", DB_URI);

    if (!DB_URI) {
      throw new Error("DB_URI is missing");
    }

    await mongoose.connect(DB_URI);

    console.log("Db connected successfully");
  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1); //stop server
  }
};

export default db;

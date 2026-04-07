import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

const db = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Db connected successfully");
  } catch (error) {
    console.log(`Error while db connection`, error);
  }
};
export default db;

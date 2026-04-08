import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

const db = async () => {
  try {
    console.log("before connection ", DB_URI);
    await mongoose.connect(DB_URI);
    console.log("Db connected successfully");
  } catch (error) {
    console.log(`Error while db connection`, error);
  }
};
export default db;

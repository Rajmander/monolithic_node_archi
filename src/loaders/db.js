// import mongoose from "mongoose";
// import { DB_URI } from "../config/env.js";

// const db = async () => {
//   try {
//     console.log("Connecting to DB:", DB_URI);

//     if (!DB_URI) {
//       throw new Error("DB_URI is missing");
//     }

//     await mongoose.connect(DB_URI);

//     console.log("Db connected successfully");
//   } catch (error) {
//     console.error("DB connection failed:", error);
//     process.exit(1); //stop server
//   }
// };

// export default db;

// /src/loaders/db.js
// /src/loaders/db.js
import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

let cached = global.mongoose || { conn: null, promise: null };

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!DB_URI) throw new Error("DB_URI missing");

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(DB_URI, {
        bufferCommands: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((conn) => conn);
  }

  cached.conn = await cached.promise;
  global.mongoose = cached;

  console.log("DB connected ✅");
  return cached.conn;
};

export default connectDB;

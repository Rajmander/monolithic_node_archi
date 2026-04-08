import app from "./app.js";
import connectDB from "./src/loaders/db.js";
import { PORT } from "./src/config/env.js";

console.log("i am running...");

const startServer = async () => {
  try {
    await connectDB();
    console.log("after db connection");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Server failed to start:", err);
    process.exit(1);
  }
};

startServer();

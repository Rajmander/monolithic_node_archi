import app from "./app.js";
import connectDB from "./src/loaders/db.js";
import { PORT } from "./src/config/env.js";

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

import express from "express";
import { loadExpress } from "./src/loaders/express.js";
import userRoutes from "./src/modules/user/user.routes.js";
import { API_PREFIX, API_VERSION, BASE_URL } from "./src/config/env.js";

const app = express();

loadExpress(app);

const BASE_ROUTE = `${API_PREFIX}/${API_VERSION}`;

app.use(`${BASE_ROUTE}`, userRoutes);

export default app;

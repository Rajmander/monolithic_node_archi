import express from "express";
import loadExpress from "./src/loaders/express.js";
import userRoutes from "./src/modules/user/user.routes.js";
import adminRoutes from "./src/modules/admin/admin.routes.js";
import { API_PREFIX, API_VERSION } from "./src/config/env.js";

const app = express();
loadExpress(app);

const BASE_ROUTE = `${API_PREFIX}/${API_VERSION}`;

//app.use(`${BASE_ROUTE}`, userRoutes);
app.use(`${BASE_ROUTE}`, adminRoutes);

export default app;

// /user and /admins are under /api/v1

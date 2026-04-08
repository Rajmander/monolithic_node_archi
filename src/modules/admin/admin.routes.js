import express from "express";
const router = express.Router();

import { saveAdmin } from "./admin.controller.js";

router.post("/admin", saveAdmin);

export default router;

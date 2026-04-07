import express from "express";
import { register, fetch } from "./user.controller.js";

const router = express.Router();

router.post("/users", register);
router.get("/users", fetch);

export default router;

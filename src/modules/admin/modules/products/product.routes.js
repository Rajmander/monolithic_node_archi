import express from "express";
import { getAll, create } from "./product.controller.js";

const router = express.Router();

router.get("/products", getAll);
router.post("/products", create);

export default router;

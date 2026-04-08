import jwt from "jsonwebtoken";
import Admin from "../admin.model.js";
import { JWT_SECRET } from "../../../config/env.js";

export const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("No token provided");

    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) throw new Error("Admin not found");

    req.user = admin;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: err.message });
  }
};

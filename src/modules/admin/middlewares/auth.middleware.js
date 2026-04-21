//Admin JWT Auth
import jwt from "jsonwebtoken";
import Admin from "../admin.model.js";
import { JWT_SECRET } from "../../../config/env.js";

/**
 * we will work on bearer token
 * 1. token should not be empty
 * 2. token should be valid
 * 3. if not valid handle error
 * 4. if valid process further -
 *
 *
 */

export const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("No token provided");

    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin) throw new Error("Admin not found");
    console.log("Admin ===", admin);
    //return;
    req.user = admin;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: err.message });
  }
};

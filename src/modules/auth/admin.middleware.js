import jwt from "jsonwebtoken";
import Admin from "../admin.model.js";
import { JWT_SECRET } from "../../../config/env.js";

/**
 * Middleware to authenticate admin using JWT
 */
export const adminAuth = async (req, res, next) => {
  try {
    // 1️⃣ Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];

    // 2️⃣ Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    // 3️⃣ Find admin in DB
    const admin = await Admin.findById(decoded.id).select("-password"); // exclude password
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Admin not found" });
    }

    // 4️⃣ Attach admin to request
    req.user = admin;

    next(); // pass control to next middleware / controller
  } catch (err) {
    console.error("Admin auth error:", err.message);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export const roleAuth = (allowedRoles = []) => {
  return (req, res, next) => {
    const admin = req.user;
    if (!allowedRoles.includes(admin.role)) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden: Access denied" });
    }
    next();
  };
};

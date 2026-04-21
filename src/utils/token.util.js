import jwt from "jsonwebtoken";
import crypto from "crypto";

export const generateAccessToken = (admin, JWT_SECRET) => {
  console.log(`generateAccessToken hi ${JWT_SECRET}`);
  return jwt.sign({ id: admin._id, role: admin.role }, JWT_SECRET, {
    expiresIn: "1m",
  });
};

export const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

export const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const getRefreshTokenExpiry = () => {
  return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
};

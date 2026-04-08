import jwt from "jsonwebtoken";
import Customer from "../../user/user.model.js";
import { JWT_SECRET } from "../../../config/env.js";

export const customerAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("No token provided");

    const decoded = jwt.verify(token, JWT_SECRET);
    const customer = await Customer.findById(decoded.id);
    if (!customer) throw new Error("Customer not found");

    req.user = customer;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: err.message });
  }
};

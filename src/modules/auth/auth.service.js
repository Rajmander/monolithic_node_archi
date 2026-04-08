import Admin from "../admin/admin.model.js";
import Customer from "../user/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../../../config/env.js";

class AuthService {
  // ===== Admin Login =====
  static async loginAdmin(email, password) {
    const admin = await Admin.findOne({ email });
    if (!admin) throw new Error("Admin not found");

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) throw new Error("Invalid credentials");

    return jwt.sign(
      { id: admin._id, role: admin.role, email: admin.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );
  }

  // ===== Customer Login =====
  static async loginCustomer(email, password) {
    const customer = await Customer.findOne({ email });
    if (!customer) throw new Error("Customer not found");

    const isMatch = await customer.comparePassword(password);
    if (!isMatch) throw new Error("Invalid credentials");

    return jwt.sign({ id: customer._id, email: customer.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
  }

  // ===== Customer Registration =====
  static async registerCustomer({ name, email, password }) {
    const exists = await Customer.findOne({ email });
    if (exists) throw new Error("Email already registered");

    const customer = await Customer.create({ name, email, password });

    return jwt.sign({ id: customer._id, email: customer.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
  }
}

export default AuthService;

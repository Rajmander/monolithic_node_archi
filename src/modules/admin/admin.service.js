import jwt from "jsonwebtoken";
import { adminLogin } from "./admin.controller.js";
import { createAdmin, findAdminByEmail } from "./admin.repository.js";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../../config/env.js";

// Creatr Admin User
export const addAdmin = async (data) => {
  try {
    const password = data.password;

    const hashedPassword = await bcrypt.hash(password, 10);

    data.password = hashedPassword;

    const savedAdmin = await createAdmin(data);
    const formattedAdmin = {
      id: savedAdmin._id,
      name: savedAdmin.name,
      email: savedAdmin.email,
      role: savedAdmin.role,
    };

    return formattedAdmin;
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];

      const customError = new Error(`${field} ${value} already exists`);
      customError.statusCode = 409;
      throw customError;
    }
    error.statusCode = 500;
    throw error;
  }
};

// Any Admin User Login
export const adminLoginService = async (email, password) => {
  try {
    const admin = await findAdminByEmail(email);
    console.log(`admin ${admin}`);

    if (!admin) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    const hashedPassword = admin.password;
    const hasPasswordMatched = await bcrypt.compare(password, hashedPassword);

    if (!hasPasswordMatched) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ id: admin._id, role: admin.role }, JWT_SECRET);

    console.log("token", token);
    const formatAdmin = {
      id: admin._id,
      name: admin.name,
      role: admin.role,
      token: token,
    };

    return formatAdmin;
  } catch (error) {
    error.statusCode = 500;
    error.message = "Internal server error";
    throw error;
  }
};

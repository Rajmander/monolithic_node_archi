import { adminLogin } from "./admin.controller.js";
import { createAdmin, findAdminByEmail } from "./admin.repository.js";
import bcrypt from "bcrypt";

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

export const adminLoginService = async (email) => {
  const admin = await findAdminByEmail(email);
};

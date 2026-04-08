import { createAdmin } from "./admin.repository.js";

export const addAdmin = async (data) => {
  try {
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

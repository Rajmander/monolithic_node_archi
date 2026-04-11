import Admin from "./admin.model.js";

export const createAdmin = async (data) => {
  const admin = new Admin(data);
  return await admin.save();
};

export const findAdminByEmail = async (email) => {
  return await Admin.findOne({ email });
};

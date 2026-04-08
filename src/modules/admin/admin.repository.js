import Admin from "./admin.model.js";

// Only db operation nothing else
export const createAdmin = async (data) => {
  const admin = new Admin(data);
  return await admin.save();
};

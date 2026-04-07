import User from "./user.model.js";

// CREATE USER
export const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

// LISTING USER
export const getUsers = async ({ skip, limit }) => {
  return await User.find().skip(skip).limit(limit);
};

// COUNT USERS
export const countUsers = async () => {
  return await User.countDocuments();
};

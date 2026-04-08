import Admin from "./admin.model.js";

export const findAllAdmins = async () => Admin.find();
export const findAdminById = async (id) => Admin.findById(id);
export const createAdmin = async (data) => Admin.create(data);
export const findAdminByEmail = async (email) => Admin.findOne({ email });

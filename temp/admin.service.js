import * as adminRepo from "./admin.repository.js";

export const getAllAdmins = async () => adminRepo.findAllAdmins();
export const getAdminById = async (id) => adminRepo.findAdminById(id);
export const addAdmin = async (data) => adminRepo.createAdmin(data);
export const getAdminByEmail = async (email) =>
  adminRepo.findAdminByEmail(email);

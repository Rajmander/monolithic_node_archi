import { success, error } from "../../utils/response.js";
import * as adminService from "./admin.service.js";

export const getAdmins = async (req, res) => {
  try {
    const admins = await adminService.getAllAdmins();
    return success(res, 200, admins, "Admins fetched successfully");
  } catch (err) {
    console.error(err);
    return error(res, 500, err, "Failed to fetch admins");
  }
};

export const createAdmin = async (req, res) => {
  try {
    const newAdmin = await adminService.addAdmin(req.body);
    return success(res, 201, newAdmin, "Admin created successfully");
  } catch (err) {
    console.error(err);
    return error(res, 500, err, "Failed to create admin");
  }
};

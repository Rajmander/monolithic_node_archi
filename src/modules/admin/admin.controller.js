import { error, success } from "../../utils/response.js";
import { addAdmin, adminLoginService } from "./admin.service.js";

export const createAdmin = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const admin = await addAdmin({ name, email, password, role });
    return success(res, 201, admin, "Role added successfully");
  } catch (err) {
    console.log("Error", err.message);
    return error(
      res,
      err.statusCode || 500,
      err.message || err,
      err.statusCode === 409 ? "Validation error" : "Internal server error",
    );
  }
};

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(`Email ${email} and password ${password}`);
    const admin = await adminLoginService(email, password);
    
    success(res, 200, admin, "Login Successfully");
  } catch (err) {
    error(res, 401, err.message, "Login failed");
  }
};

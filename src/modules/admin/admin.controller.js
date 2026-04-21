import { error, success } from "../../utils/response.js";
import {
  addAdmin,
  adminLoginService,
  refreshTokenService,
} from "./admin.service.js";

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

    const meta = {
      ipAddress: req.ip,
      device: req.headers["user-agent"],
      userAgent: req.headers["user-agent"],
    };

    console.log("meta data", meta);

    console.log(`Email ${email} and password ${password}`);

    const admin = await adminLoginService(email, password, meta);

    success(res, 200, admin, "Login Successfully");
  } catch (err) {
    error(res, 401, err.message, "Login failed");
  }
};

// Refresh Token
export const refreshtoken = async (req, res, next) => {
  try {
    const refreshToken = req.headers["x-refresh-token"];
    console.log("step 1", refreshToken);

    const data = await refreshTokenService(refreshToken);
    success(res, 200, data, "Token refreshed");
  } catch (err) {
    error(res, 401, err.message, "All gone");
    console.log(err);
  }
};

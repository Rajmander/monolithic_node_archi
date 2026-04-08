import { error, success } from "../../utils/response.js";
import { addAdmin } from "./admin.service.js";

export const saveAdmin = async (req, res, next) => {
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

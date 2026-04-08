import express from "express";
import { getAdmins, createAdmin } from "./admin.controller.js";
import usersRoutes from "./modules/customers/customer.routes.js";
import productsRoutes from "./modules/products/product.routes.js";
import brandsRoutes from "./modules/brands/brand.routes.js";
import settingsRoutes from "./modules/settings/setting.routes.js";
import { adminAuth } from "./middlewares/auth.middleware.js";
import { roleAuth } from "./middlewares/roleAuth.js";

const router = express.Router();

// Admin management
router.get("/", adminAuth, roleAuth(["superadmin"]), getAdmins);
router.post("/", adminAuth, roleAuth(["superadmin"]), createAdmin);

// Module sub-routes with role access
router.use(
  "/customers",
  adminAuth,
  roleAuth(["superadmin", "agent", "subadmin"]),
  usersRoutes,
);
router.use(
  "/products",
  adminAuth,
  roleAuth(["superadmin", "vendor"]),
  productsRoutes,
);
router.use(
  "/brands",
  adminAuth,
  roleAuth(["superadmin", "vendor"]),
  brandsRoutes,
);
router.use(
  "/settings",
  adminAuth,
  roleAuth(["superadmin", "subadmin"]),
  settingsRoutes,
);

export default router;

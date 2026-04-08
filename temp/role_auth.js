// src/modules/admin/middlewares/roleAuth.js
export const roleAuth = (allowedRoles = []) => {
  return (req, res, next) => {
    const user = req.user; // set by auth middleware after token verification
    if (!user)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    if (!allowedRoles.includes(user.role)) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden: Access denied" });
    }
    next();
  };
};

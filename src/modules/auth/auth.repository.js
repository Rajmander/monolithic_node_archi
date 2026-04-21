import RefreshToken from "./refreshToken.model.js";
import Admin from "../admin/admin.model.js";

// Create refresh token
export const createRefreshToken = async (data) => {
  return await RefreshToken.create(data);
};

// Find refresh token
export const findRefreshTokenByHash = async (tokenHash) => {
  return await RefreshToken.findOne({ tokenHash });
};

// Revoke refresh token
export const revokeRefreshToken = async (tokenHash, data = {}) => {
  return await RefreshToken.updateOne(
    { tokenHash },
    { isRevoked: true, revokedAt: new Date(), ...data },
  );
};

// Find user
export const findUserById = async (id) => {
  return await Admin.findById(id);
};

// Revoke tokens
export const revokeAllRefreshTokens = async (userId) => {
  return await RefreshToken.updateMany(
    { userId, isRevoked: false },
    { $set: { isRevoked: true, revokedAt: new Date() } },
  );
};

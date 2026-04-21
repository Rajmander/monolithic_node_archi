import RefreshToken from "./refreshToken.model.js";
import Admin from "../admin/admin.model.js";
// Create refresh token
export const createRefreshToken = async (data) => {
  return await RefreshToken.create(data);
};

export const findRefreshTokenByHash = async (tokenHash) => {
  return await RefreshToken.findOne({ tokenHash });
};

export const revokeRefreshToken = async (tokenHash, data = {}) => {
  return await RefreshToken.updateOne(
    { tokenHash },
    { isRevoked: true, revokedAt: new Date(), ...data },
  );
};

export const findUserById = async (id) => {
  return await Admin.findById(id);
};

// Find refresh token

// Revoke refresh token

// delete all user tokens

import { adminLogin } from "./admin.controller.js";
import { createAdmin, findAdminByEmail } from "./admin.repository.js";
import {
  createRefreshToken,
  findRefreshTokenByHash,
  revokeRefreshToken,
  findUserById,
  revokeAllRefreshTokens,
} from "../auth/auth.repository.js";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../../config/env.js";
import {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
  getRefreshTokenExpiry,
} from "../../utils/token.util.js";

// Creatr Admin User
export const addAdmin = async (data) => {
  try {
    const password = data.password;

    const hashedPassword = await bcrypt.hash(password, 10);

    data.password = hashedPassword;

    const savedAdmin = await createAdmin(data);
    const formattedAdmin = {
      id: savedAdmin._id,
      name: savedAdmin.name,
      email: savedAdmin.email,
      role: savedAdmin.role,
    };

    return formattedAdmin;
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];

      const customError = new Error(`${field} ${value} already exists`);
      customError.statusCode = 409;
      throw customError;
    }
    error.statusCode = 500;
    throw error;
  }
};

// Refresh token service
export const refreshTokenService = async (oldToken) => {
  const OldHashToken = hashToken(oldToken);
  //console.log(hashToken1);
  //return;

  const tokenDoc = await findRefreshTokenByHash(OldHashToken);

  console.log(tokenDoc);

  if (!tokenDoc) {
    const error = new Error("Invalid refresh token");
    error.statusCode = 401;
    throw error;
  }

  if (new Date() > tokenDoc.expiresAt) {
    await revokeRefreshToken(OldHashToken);
    throw Object.assign(new Error("Refresh token expired"), {
      statusCode: 401,
    });
  }

  // Reuse case if refresh token is revoked and user use it then it must be logout
  if (tokenDoc.isRevoked) {
    await revokeAllRefreshTokens(tokenDoc.userId);
    const error = new Error("Refesh Token reuse detected");
    error.statusCode = 401;
    throw error;
  }

  // Rotate token
  const newRefreshToken = generateRefreshToken();
  const newHash = hashToken(newRefreshToken);

  // Revoke refresh token
  await revokeRefreshToken(OldHashToken, { replacedByToken: newHash });

  // create refresh token
  const refreshTokenObject = {
    userId: tokenDoc.userId,
    tokenHash: newHash,
    expiresAt: getRefreshTokenExpiry(),
    //expiresAt: new Date(Date.now() - 60 * 1000),
  };

  await createRefreshToken(refreshTokenObject);

  const admin = await findUserById(tokenDoc.userId);

  if (!admin) {
    const error = new Error("User not found");
    error.statusCode = 400;
    throw error;
  }

  const accessToken = generateAccessToken(
    {
      id: tokenDoc.userId,
      role: admin.role,
    },
    JWT_SECRET,
  );

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};

// Any Admin User Login
export const adminLoginService = async (email, password, meta) => {
  try {
    const admin = await findAdminByEmail(email);
    console.log(`admin ${admin}`);

    if (!admin) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    const hashedPassword = admin.password;
    const hasPasswordMatched = await bcrypt.compare(password, hashedPassword);

    if (!hasPasswordMatched) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    console.log("After Password----> ", JWT_SECRET);

    const accessToken = generateAccessToken(admin, JWT_SECRET);
    console.log(`accessToken= ${accessToken}`);

    const refreshToken = generateRefreshToken();
    console.log(refreshToken);

    const tokenHash = hashToken(refreshToken);

    console.log(tokenHash);

    const refreshTokenObject = {
      userId: admin._id,
      tokenHash: tokenHash,
      expiresAt: getRefreshTokenExpiry(),
      //expiresAt: new Date(Date.now() - 60 * 1000),
      device: meta.device,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    };

    console.log(refreshTokenObject);

    await createRefreshToken(refreshTokenObject);

    // console.log("token", token);
    const formatAdmin = {
      id: admin._id,
      name: admin.name,
      role: admin.role,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    return formatAdmin;
  } catch (error) {
    error.statusCode = 500;
    error.message = "Internal server error";
    throw error;
  }
};

// when login get accessToken and refreshToken
// access token not valid ?
// access token expired -> use refresh token to get new access token what happened to old one and how it is managed in collection
// various use cases

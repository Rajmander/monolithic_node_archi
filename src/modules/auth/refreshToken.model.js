import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
  },
  tokenHash: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  ipAddress: {
    type: String,
  },
  userAgent: {
    type: String,
  },
  device: {
    type: String,
  },
  isRevoked: {
    type: Boolean,
    default: false,
  },
  revokedAt: {
    type: Date,
  },
  replacedByToken: {
    type: String,
  },
});
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export default mongoose.model("RefreshToken", refreshTokenSchema);

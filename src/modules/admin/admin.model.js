import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["superadmin", "subadmin", "vendor", "agent"],
    default: "subadmin",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("admin", AdminSchema);

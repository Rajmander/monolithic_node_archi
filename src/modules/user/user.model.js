import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      minlength: 3,
      maxlength: 120,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      maxlength: 150,
    },
    mobile: {
      type: String,
      unique: true,
      maxlength: 10,
    },
  },
  { _versionKey: false },
);

const User = mongoose.model("User", UserSchema);
export default User;

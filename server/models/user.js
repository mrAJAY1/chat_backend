import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: "username is required",
    },
    email: {
      type: String,
      lowercase: true,
      required: "email is required",
    },
    password: {
      type: String,
      required: "password is required",
    },
    verified: {
      type: Boolean,
      default: false,
      required: "verification confirmation is required",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("chat-user", userSchema);

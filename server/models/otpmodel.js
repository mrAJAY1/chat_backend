import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: "email is required",
      unique: true,
    },
    otp: {
      type: String,
      required: "otp is required",
    },
    otpTime: {
      type: Date,
      default: Date.now(),
    },
    otpExpiry: {
      type: Date,
      default: Date.now() + 10 * 1000,
    },
    username: {
      type: String,
      required: "username is required",
    },
    updatedAt: {
      type: Date,
      expires: 60 * 60 * 3,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("otp-chat", otpSchema);

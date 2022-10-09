import { Router } from "express";
import {
  resendOtp,
  sendOtp,
  signin,
  signup,
  verifyOtp,
} from "../controllers/authController.js";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/generate_otp", sendOtp);
router.post("/resend_otp", resendOtp);
router.post("/verify_otp", verifyOtp);

export default router;

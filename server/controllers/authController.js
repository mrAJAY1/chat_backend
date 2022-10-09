import createErr from "../error.js";
import otpmodel from "../models/otpmodel.js";
import User from "../models/user.js";
import sendMail from "../utils/sendMail.js";
import { genOtp } from "../utils/utils.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (username && email && password) {
    try {
      const user = await User.create({
        username,
        password,
        email,
      });
      delete user.password;
      res.json({ user });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
};
export const signin = async (req, res, next) => {
  res.send("hello signin world");
};
export const sendOtp = async (req, res, next) => {
  const { email } = req.body;
  if (email) {
    const exists = User.exists({ email }).lean();
    if (exists) {
      return next("user already exists", 409);
    }
    const otp = genOtp();
    try {
      const info = await sendMail(email, otp);
      const data = await otpmodel.findOneAndUpdate(
        { email },
        { email, otp },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      console.log(data.otpExpiry.getTime());
      res.json({ messageId: info.messageId, data });
    } catch (err) {
      console.log(err);
      next(err);
    }
  } else {
    next(createErr("invalid credentials", 400));
  }
};
export const resendOtp = async (req, res, next) => {
  const { email } = req.body;
  if (email) {
    const data = await otpmodel.findOne({ email });
    if (data) {
      try {
        const info = await sendMail(email, data.otp);
        await otpmodel.findOneAndUpdate({ email }, { updatedAt: new Date() });
        res.json({ messageId: info.messageId });
      } catch (error) {
        next(error);
      }
    } else {
      try {
        const otp = genOtp();
        const info = await sendMail(email, otp);
        await otpmodel.create({ email, otp });
        res.json({ messageId: info.messageId });
      } catch (error) {
        next(error);
      }
    }
  } else {
    next(createErr("invalid credentials", 400));
  }
};
export const verifyOtp = async (req, res, next) => {
  const { email, otp } = req.body;
  console.log(otp);
  if (email && otp) {
    const data = await otpmodel.findOne({ email });
    console.log(data);
    if (data && data.otp === otp) {
      res.json({ status: "success" });
    } else {
      res.json({ status: "failed", message: "invalid otp" });
    }
  }
};

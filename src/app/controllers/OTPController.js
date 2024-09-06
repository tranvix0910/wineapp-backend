import bcrypt from "bcryptjs";
import { mailService } from "../../services/MailService.js";

import OTPModel from "../models/OTPModel.js";
import UserModel from "../models/UserModel.js";

export const sendOTP = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000);
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(otp.toString(), salt);
  try {
    const existEmail = await UserModel.findOne({ email });
    if (!existEmail) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
    const newOTP = new OTPModel({
      email: email,
      otp: hash,
      createAt: Date.now(),
      expiresAt: Date.now() + 60000,
    });
    await newOTP.save();
    await mailService({
      email: email,
      subject: "Verify your email",
      html: `<p>Enter <b>${otp}</b> in the app to verify your email address. This code expires in <b>1 minute</b></p>`,
    });
    return res
      .status(200)
      .json({ success: true, message: "Send success", data: newOTP });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Send failed", err: error });
  }
};
export const checkOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    await OTPModel.deleteMany({ expiresAt: { $lt: Date.now() } });
    const existOTP = await OTPModel.findOne({ email });
    if (!existOTP) {
      return res
        .status(400)
        .json({ success: false, message: "OTP has expired" });
    }
    const comparedOTP = bcrypt.compare(otp.toString(), existOTP.otp);
    if (!comparedOTP) {
      return res.status(401).json({ success: false, message: "Invalid OTP" });
    }
    return res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to verify OTP", err: error });
  }
};

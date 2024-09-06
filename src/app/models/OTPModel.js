import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    requied: true,
  },
  otp: {
    type: String,
    requied: true,
  },
  createAt: {
    type: Date,
  },
  expiresAt: {
    type: Date,
  },
});

const OTPModel = mongoose.model("hashedOTPs",OTPSchema)

export default OTPModel

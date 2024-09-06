import express from "express";

import {
  sendOTP,
  checkOTP,
} from "../app/controllers/OTPController.js";
const router = express.Router();

router.post("/send", sendOTP);
router.post("/check", checkOTP);

export default router;

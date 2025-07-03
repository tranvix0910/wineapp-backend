import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { mailService } from "../../services/MailService.js";
import UserModel from "../models/UserModel.js";

// generate token
const generateAccessToken = (user) => {
  return jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_ACCESSTOKEN_KEY,
    {
      expiresIn: "30s",
    }
  );
};
const generateRefreshToken = (user) => {
  return jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_REFRESHTOKEN_KEY,
    {
      expiresIn: "365d",
    }
  );
};

// controllers
export const register = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const email = req.body.email;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(404)
        .json({ success: false, message: "Email has been used !!" });
    }
    const newUser = new UserModel({
      username: req.body.username,
      email: email,
      password: hash,
      phone: req.body.phone,
      age: req.body.age,
    });
    await newUser.save();
    await mailService({
      email: email,
      subject: "Welcome to WineApp! 🍷",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Welcome to <span style="color: #8B0000;">WineApp</span>!</h2>
          <p>Dear <b>${req.body.username || "user"}</b>,</p>
          <p>
            Thank you for registering an account with <b>WineApp</b>.<br>
            We are excited to have you join our wine-loving community!
          </p>
          <p>
            You can now explore, review, and manage your favorite wines with ease.<br>
            If you have any questions or need support, feel free to reply to this email.
          </p>
          <p>
            Cheers,<br>
            <b>The WineApp Team</b>
          </p>
          <hr>
          <small>
            This is an automated message. Please do not reply directly to this email.
          </small>
        </div>
      `
    });
    res.status(200).json({
      success: true,
      message: "Register success",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Create account failed",
    });
  }
};

export const login = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await UserModel.findOne({ email });
    // if user doesn't exist
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    // if password is incorrect
    if (!checkPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }
    // create token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const { password, role, ...rest } = user._doc;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.status(200).json({
      success: true,
      data: { ...rest, accessToken },
      role,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    res.status(200).json({ success: true, message: "Log out success" });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};

export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  try {
    if (!refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "You're not authenticated" });
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESHTOKEN_KEY, (err, user) => {
      if (err) {
        return res
          .status(404)
          .json({ success: false, message: "Refresh token is invalid" });
      }
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });

      res.status(200).json({ success: true, accessToken: newAccessToken });
    });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};

export const resetPassworrd = async (req, res) => {
  const { newPass, confirmPass, email } = req.body;
  try {
    const comparePassword = bcrypt.compare(newPass, confirmPass);
    if (!comparePassword) {
      return res
        .status(400)
        .json({ success: false, message: "Password doesn't match" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(newPass, salt);
    const newUser = await UserModel.findOneAndUpdate({
      email,
      password: hashPass,
    });
    return res.status(200).json({
      success: true,
      message: "Update password success",
      data: newUser,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Update password faile", err: error });
  }
};

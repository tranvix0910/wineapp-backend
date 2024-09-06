import express from "express";
import {
  register,
  login,
  resetPassworrd,
  refreshToken,
  logout
} from "../app/controllers/AuthController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refreshToken", refreshToken);
router.post("/reset", resetPassworrd);

export default router;

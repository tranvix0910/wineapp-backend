import express from "express";
import {
  toggleFavoriteWine,
  getFavoriteWine,
} from "../app/controllers/FavoriteController.js";

import { verifyToken } from "../utils/verify.js";

const router = express.Router();

router.post("/", verifyToken, toggleFavoriteWine);
router.get("/", verifyToken, getFavoriteWine);

export default router;

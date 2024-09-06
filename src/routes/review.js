import express from "express";
import { createReview,getReviews } from "../app/controllers/ReviewController.js";
import { verifyToken } from "../utils/verify.js";
const router = express.Router();

router.post("/:wineId", verifyToken, createReview);
router.get("/", getReviews);

export default router;

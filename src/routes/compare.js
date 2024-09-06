import express from "express";
import {
  toggleCompare,
  removeCompare,
} from "../app/controllers/CompareController.js";
import { verifyToken } from "../utils/verify.js";

const router = express.Router();

router.post("/", verifyToken, toggleCompare);
router.post("/remove", verifyToken, removeCompare);

export default router;

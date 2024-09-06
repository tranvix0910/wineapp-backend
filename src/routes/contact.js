import express from "express";
import { addContact } from "../app/controllers/ContactController.js";
import { verifyToken } from "../utils/verify.js";

const router = express.Router();

router.post("/", verifyToken, addContact);

export default router;

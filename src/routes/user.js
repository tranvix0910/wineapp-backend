import express from "express";

import {
  changeInformation,
  getUser,
} from "../app/controllers/UserController.js";
import { verifyUser } from "../utils/verify.js";
import { upload } from "../services/UploadFile.js";

const router = express.Router();

router.get("/:id", verifyUser, getUser);
router.put("/:id", verifyUser, upload.single("avatar"), changeInformation);

export default router;

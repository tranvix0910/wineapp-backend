import express from "express";
import {
  getBlogs,
  getNewst,
  getBlogCount,
} from "../app/controllers/BlogController.js";


const router = express.Router();

router.get("/", getBlogs);
router.get("/new", getNewst);
router.get("/count", getBlogCount);
export default router;

import express from "express";
import {
  getWines,
  getFeatured,
  getTopRated,
  getWineBySearch,
  getWineDetail,
} from "../app/controllers/WineController.js";


const router = express.Router();

router.get("/" , getWines);
router.get("/featured", getFeatured);
router.get("/top-rated", getTopRated);
router.get("/search", getWineBySearch);
router.get("/:id", getWineDetail);

export default router;

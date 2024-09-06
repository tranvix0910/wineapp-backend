import express from "express";
import { verifyToken } from "../utils/verify.js";
import {
  addNewAddress,
  getAllAddresses,
  updatedAddress,
  deleteAddress,
} from "../app/controllers/AddressController.js";

const router = express.Router();

router.post("/add", verifyToken, addNewAddress);
router.post("/update/:id", verifyToken, updatedAddress);
router.delete("/delete/:id", verifyToken, deleteAddress);
router.get("/", verifyToken, getAllAddresses);


export default router

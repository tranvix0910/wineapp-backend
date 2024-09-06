import express from "express";
import {
  addToCart,
  getProducts,
  increaseProduct,
  decreaseProduct,
  clearCart,
  removeProduct,
} from "../app/controllers/CartController.js";
import { verifyUser } from "../utils/verify.js";
const router = express.Router();

router.post("/add/:id", verifyUser, addToCart);
router.get("/:id", verifyUser, getProducts);
router.put("/increase/:id", verifyUser, increaseProduct);
router.put("/decrease/:id", verifyUser, decreaseProduct);
router.put("/clear/:id", verifyUser, clearCart);
router.put("/remove/:id", verifyUser, removeProduct);
export default router;

import express from "express";
import {
  addToCart,
  getCartProducts,
  updateQuantity,
  removeAllFromCart,
  clearCartAfterPurchase,
} from "../controllers/cart.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, addToCart);
router.get("/", protectRoute, getCartProducts);
router.put("/:id", protectRoute, updateQuantity);
router.delete("/", protectRoute, removeAllFromCart);
router.delete("/clear-cart", protectRoute, clearCartAfterPurchase);
export default router;

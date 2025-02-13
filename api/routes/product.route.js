import express from "express";
import {
  createProduct,
  getAllProducts,
  getFeaturedProducts,
  getRecommendedProducts,
  deleteProduct,
} from "../controllers/product.controller.js";
import { protectRoute, adminRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, adminRoute, createProduct);
router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/recommendations", getRecommendedProducts);
router.delete("/:product_id", protectRoute, adminRoute, deleteProduct);

export default router;

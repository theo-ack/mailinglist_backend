import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
} from "../controllers/product-controller.js";
import { authMiddleware } from "../middleware.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", authMiddleware, createProduct);
router.update("/:id", authMiddleware, updateProduct);

export default router;

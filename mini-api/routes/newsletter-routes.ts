import express from "express";
import { updateNewsletter, getNewsletter } from "../controllers/newsletter-controller";
import { authMiddleware } from "../middleware";

const router = express.Router();

router.put("/newsletter", authMiddleware, updateNewsletter);
router.get("/newsletter", getNewsletter);

export default router;

import express from "express";
import {
  addSubscriber,
  getSubscribers,
} from "../controllers/subscribers-controller";

const router = express.Router();

/** 🔹 Route: Neuen Abonnenten hinzufügen */
router.post("/subscribe", addSubscriber);

/** 🔹 Route: Alle Abonnenten abrufen */
router.get("/subscribers", getSubscribers);

export default router;

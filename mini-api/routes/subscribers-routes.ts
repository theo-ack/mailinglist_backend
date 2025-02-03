import express from "express";
import { addSubscriber, getSubscribers, removeSubscriber } from "../controllers/subscribers-controller";

const router = express.Router();

/** 🔹 Route: Neuen Abonnenten hinzufügen */
router.post("/subscribe", addSubscriber);

/** 🔹 Route: Alle Abonnenten abrufen */
router.get("/subscribers", getSubscribers);

/** 🔹 Route: Abonnenten löschen */
router.delete("/unsubscribe/:id", removeSubscriber);

export default router;

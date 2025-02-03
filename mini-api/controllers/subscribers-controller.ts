import { readFromDb, writeToDb } from "../services/db-service";
import { Request, Response } from "express";

/** 🔹 Abonnenten hinzufügen (POST) */
export async function addSubscriber(req: Request, res: Response) {
  const { name, lastname, mail, phone } = req.body;
  
  // Validierung: Alle Felder müssen ausgefüllt sein
  if (!name || !lastname || !mail || !phone) {
    return res.status(400).json({ error: "⚠️ Bitte alle Felder ausfüllen (name, lastname, mail, phone)" });
  }

  const dbData = await readFromDb();

  // Prüfen, ob die E-Mail bereits existiert
  if (dbData.subscribers.some(sub => sub.mail === mail)) {
    return res.status(409).json({ error: "⚠️ Diese E-Mail ist bereits abonniert" });
  }

  const newSubscriber = {
    id: dbData.subscribers.length > 0 ? Math.max(...dbData.subscribers.map(s => s.id)) + 1 : 1,
    name,
    lastname,
    mail,
    phone,
  };

  dbData.subscribers.push(newSubscriber);
  await writeToDb(dbData);
  res.status(201).json({ message: "✅ Abonnent gespeichert", subscriber: newSubscriber });
}

/** 🔹 Alle Abonnenten abrufen (GET) */
export async function getSubscribers(req: Request, res: Response) {
  const dbData = await readFromDb();
  res.json({ subscribers: dbData.subscribers });
}



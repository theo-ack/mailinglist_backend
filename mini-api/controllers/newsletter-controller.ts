import { readFromDb, writeToDb } from "../services/db-service";
import { Request, Response } from "express";

export async function updateNewsletter(req: Request, res: Response) {
  const { newsletter } = req.body;
  if (!newsletter) {
    return res.status(400).json({ error: "Newsletter-Inhalt erforderlich" });
  }

  const dbData = await readFromDb();
  dbData.newsletter = newsletter;
  await writeToDb(dbData);
  res.json({ message: "Newsletter gespeichert", newsletter });
}

export async function getNewsletter(req: Request, res: Response) {
  const dbData = await readFromDb();
  res.json({ newsletter: dbData.newsletter });
}

import { readFile, writeFile } from "fs/promises";
import Product from "../models/product-model.js";

type Subscriber = {
  id: number;
  name: string;
  lastname: string;
  mail: string;
  phone: number;
};

type DbData = {
  newsletter: string;
  subscribers: Subscriber[];
};

const DB_PATH = "store/db.json";

export const getAllSubscribers = async (req, res) => {
  try {
    const dbdata = await readFromDb();
    res.json({ data: dbdata.subscribers });
  } catch (error) {
    res.status(500).json({ error: "Fehler beim Abrufen der Abonnenten" });
  }
};

async function readFromDb() {
  const dataString = (await readFile(DB_PATH)).toString();
  const parsedData: DbData = JSON.parse(dataString);
  return parsedData;
}

export const createSubscriber = async (req, res) => {
  try {
    const { name, lastname, mail, phone } = req.body;

    if (!name || !lastname || !mail || !phone) {
      return res.status(400).json({
        error: "Bitte fülle alle Felder aus (name, lastName, email, phone)",
      });
    }

    const dbdata = await readFromDb();
    const newSubscriber: Subscriber = {
      id: dbdata.subscribers.length + 1,
      name,
      lastname,
      mail,
      phone,
    };

    dbdata.subscribers.push(newSubscriber);
    await writeFile(DB_PATH, JSON.stringify(dbdata, null, 2));

    res.status(201).json({ data: newSubscriber });
  } catch (error) {
    res.status(500).json({ error: "Fehler beim Erstellen des Abonnenten" });
  }
};

export const updateSubscriber = async (req, res) => {
  try {
    const { name, lastname, mail, phone } = req.body;
    if (!name || !lastname || !mail || !phone) {
      return res.status(400).json({
        error: "Bitte fülle alle Felder aus (name, lastName, email, phone)",
      });
    }

    const dbdata = await readFromDb();
    const subscriberIndex = dbdata.subscribers.findIndex(
      (s) => s.id === parseInt(req.params.id)
    );

    if (subscriberIndex === -1) {
      return res.status(404).json({ error: "Abonnent nicht gefunden" });
    }

    dbdata.subscribers[subscriberIndex] = {
      id: parseInt(req.params.id),
      name,
      lastname,
      mail,
      phone,
    };
    await writeFile(DB_PATH, JSON.stringify(dbdata, null, 2));

    res.json({ data: dbdata.subscribers[subscriberIndex] });
  } catch (error) {
    res.status(500).json({ error: "Fehler beim Aktualisieren des Abonnenten" });
  }
};

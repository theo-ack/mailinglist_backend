import { readFile, writeFile } from "fs/promises";

const DB_PATH = "store/db.json";

type Subscriber = {
  id: number;
  name: string;
  lastname: string;
  mail: string;
  phone: string;
};

type DbData = {
  newsletter: string;
  subscribers: Subscriber[];
};

/** 🔹 Datenbank aus Datei lesen */
export async function readFromDb(): Promise<DbData> {
  try {
    const dataString = await readFile(DB_PATH, "utf-8");
    return JSON.parse(dataString);
  } catch (error) {
    console.error("❌ Fehler beim Lesen der Datenbank:", error);
    return { newsletter: "", subscribers: [] };
  }
}

/** 🔹 Datenbank in Datei schreiben */
export async function writeToDb(data: DbData) {
  try {
    await writeFile(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("❌ Fehler beim Schreiben in die Datenbank:", error);
  }
}

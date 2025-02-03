import express from "express";
import bodyParser from "body-parser";
import { readFile, writeFile } from "fs/promises";

const app = express();
const PORT = 3000;

// Middleware für JSON-Parsing
app.use(bodyParser.json());

// 🔹 Fehlerhandling für ungültige JSON-Anfragen
function errorMiddleware(err, req, res, next) {
  if (err.name === "SyntaxError") {
    return res.status(400).json({ error: "❌ Ungültiges JSON-Format" });
  }
  next();
}
app.use(errorMiddleware);

// 🔹 Funktion zum Lesen der Datenbank mit Fehlerhandling
async function readDb() {
  try {
    const data = await readFile("./store/db.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("⚠️ Fehler beim Lesen der Datenbank:", error);
    return { newsletter: "Noch kein Newsletter vorhanden", subscribers: [] };
  }
}

// 🔹 Funktion zum Schreiben in die Datenbank
async function writeDb(data) {
  try {
    await writeFile("./store/db.json", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("⚠️ Fehler beim Speichern der Datenbank:", error);
  }
}

// 📩 **Newsletter abrufen**
app.get("/newsletters", async (req, res) => {
  const db = await readDb();
  // Alle Newsletter-Objekte abrufen
  const newsletters = Object.values(db).map((newsletter) => ({
    newsletter: newsletter.newsletter,
    subscribers: newsletter.subscribers,
  }));
  return res.json({ newsletters });
});

//bestimten newsletter abrufen
app.get("/newsletter/:newsletterId", async (req, res) => {
  const { newsletterId } = req.params;
  const db = await readDb();

  // Prüfen, ob der Newsletter existiert
  if (!db[newsletterId]) {
    return res.status(404).json({ error: "Newsletter nicht gefunden" });
  }

  return res.json({
    newsletter: db[newsletterId].newsletter,
    subscribers: db[newsletterId].subscribers,
  });
});

// ✍ **Newsletter aktualisieren**
app.put("/newsletter", async (req, res) => {
  const { newsletter } = req.body;
  if (!newsletter) {
    return res
      .status(400)
      .json({ error: "⚠️ Bitte den Newsletter-Text angeben" });
  }

  const db = await readDb();
  db.newsletter = newsletter;
  await writeDb(db);
  res.json({ message: "✅ Newsletter aktualisiert", newsletter });
});

// 📋 **Alle Abonnenten abrufen**
app.get("/subscribers", async (req, res) => {
  const db = await readDb();
  return res.json({ subscribers: db.subscribers });
});

// ➕ **Neuen Abonnenten hinzufügen**
app.post("/subscribe", async (req, res) => {
  const { name, lastname, mail, phone } = req.body;

  if (!name || !lastname || !mail || !phone) {
    return res.status(400).json({
      error: "⚠️ Bitte alle Felder ausfüllen (name, lastname, mail, phone)",
    });
  }

  const db = await readDb();

  // Prüfen, ob die E-Mail bereits existiert
  if (db.subscribers.some((sub) => sub.mail === mail)) {
    return res
      .status(409)
      .json({ error: "⚠️ Diese E-Mail ist bereits abonniert" });
  }

  const newSubscriber = {
    id:
      db.subscribers.length > 0
        ? Math.max(...db.subscribers.map((s) => s.id)) + 1
        : 1,
    name,
    lastname,
    mail,
    phone,
  };

  db.subscribers.push(newSubscriber);
  await writeDb(db);
  res
    .status(201)
    .json({ message: "✅ Abonnent gespeichert", subscriber: newSubscriber });
});

// 🔥 **Server starten**
app.listen(PORT, () => {
  console.log(`✅ Server läuft auf http://localhost:${PORT}`);
});

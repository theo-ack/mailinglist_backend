import { readFile } from "fs/promises";
import express from "express";
import bodyParser from "body-parser";
import { errorMiddleware } from "./middleware";
import productRoutes from "./routes/product-routes";

const DB_PATH = "store/db.json";

type Subscriber = {
  id: number;
  name: string;
  lastname: string;
  mail: string;
};

type DbData = {
  newsletter: string;
  subscribers: Subscriber[];
};

async function readFromDb() {
  const dataString = (await readFile(DB_PATH)).toString();
  const parsedData: DbData = JSON.parse(dataString);
  return parsedData;
}

(async () => {
  const dbdata = await readFromDb();
  console.log(dbdata.newsletter);
})();

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(errorMiddleware);

// Produkt-Routen
app.use("/products", productRoutes);
app.use("/public", productRoutes);

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});

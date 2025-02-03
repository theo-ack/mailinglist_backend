import express from "express";
import bodyParser from "body-parser";
import { errorMiddleware } from "./middleware";
import subscriberRoutes from "./routes/subscribers-routes";
import newsletterRoutes from "./routes/newsletter-routes";

const app = express();
const PORT = 3000;

// 📌 Middleware
app.use(bodyParser.json());
app.use(errorMiddleware);

// 📌 API-Routen
app.use("/api", subscriberRoutes);
app.use("/api", newsletterRoutes);

// 📌 Server starten
app.listen(PORT, () => {
  console.log(`✅ Server läuft auf http://localhost:${PORT}`);
});

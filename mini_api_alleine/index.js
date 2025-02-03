import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

// Body Parser Middleware
app.use(bodyParser.json());

// Errorhandling from bodyparser here:
function errorMiddleware(err, req, res, next) {
  if (err.name === "SyntaxError") {
    return res.json({
      error: err.message,
      code: 400,
    });
  }

  next();
}

app.use(errorMiddleware);

// Temporäre Datenbank (in-memory)
let products = [
  {
    id: 1,
    name: "Nike Airforce 1",
    description: "Tolles paar Schuhe",
    price: 89.99,
  },
  {
    id: 2,
    name: "Dell XPS 13 2024",
    description: "Leistungsstarker Laptop",
    price: 1899.99,
  },
  {
    id: 3,
    name: "Apple iPhone 13",
    description: "Neuestes iPhone",
    price: 999.99,
  },
  {
    id: 4,
    name: "Apple Watch Series 7",
    description: "Smartwatch von Apple",
    price: 399.99,
  },
  {
    id: 5,
    name: "Sony WH-1000XM4",
    description: "Noise Cancelling Kopfhörer",
    price: 349.99,
  },
  {
    id: 6,
    name: "Nintendo Switch",
    description: "Spielekonsole von Nintendo",
    price: 299.99,
  },
  {
    id: 7,
    name: "Sony A7 III",
    description: "Spiegellose Vollformatkamera",
    price: 1799.99,
  },
  {
    id: 8,
    name: "Logitech MX Master 3",
    description: "Kabellose Maus",
    price: 99.99,
  },
  {
    id: 9,
    name: "Bose QuietComfort 45",
    description: "Noise Cancelling Kopfhörer",
    price: 329.99,
  },
  {
    id: 10,
    name: "Samsung Galaxy S21",
    description: "Smartphone von Samsung",
    price: 799.99,
  },
];

// Endpunkte für die Produkte

// GET /products - Alle Produkte abrufen

app.get("/products", (req, res) => {
  return res.json({ data: products });
});

// GET /products/:id - Ein bestimmtes Produkt abrufen
app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: "Produkt nicht gefunden" });
  }

  return res.json({ data: product });
});

// POST /products - Neues Produkt erstellen
app.post("/products", (req, res) => {
  // validiere die Eingabe
  if (!req.body.name || !req.body.description || !req.body.price) {
    return res
      .status(400)
      .json({
        error: "Bitte fülle alle Felder aus (name, description, price)",
      });
  }

  const { name, description, price } = req.body;

  const newProduct = {
    id: products.length + 1,
    name,
    description,
    price,
  };

  products.push(newProduct);
  res.status(201).json({ data: newProduct });
});

// PUT /products/:id - Ein Produkt aktualisieren
app.put("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  // Product validation - guard clause
  if (!product)
    return res.status(404).json({ error: "Produkt nicht gefunden" });
  // validiere die Eingabe
  if (!req.body.name || !req.body.description || !req.body.price)
    return res
      .status(400)
      .json({
        error: "Bitte fülle alle Felder aus (name, description, price)",
      });

  product.name = req.body.name;
  product.description = req.body.description;
  product.price = req.body.price;
  return res.json({ data: product });
});

// DELETE /products/:id - Ein Produkt löschen
app.delete("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ error: "Produkt nicht gefunden" });
  }

  products.splice(productIndex, 1);
  return res.status(204).send();
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});

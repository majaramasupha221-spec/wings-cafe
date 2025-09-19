const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;
const dbPath = path.join(__dirname, "products.json");

app.use(cors());
app.use(express.json());

// Ensure products.json exists
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, "[]"); // start with empty array
}

// Helper to read DB
function readDB() {
  try {
    const data = fs.readFileSync(dbPath, "utf8");
    return JSON.parse(data || "[]");
  } catch (err) {
    console.error("Error reading DB:", err);
    return [];
  }
}

// Helper to write DB
function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// Routes
app.get("/", (req, res) => {
  res.send("Wings Cafe Inventory API is running...");
});

// Get all products
app.get("/api/products", (req, res) => {
  res.json(readDB());
});

// Add product
app.post("/api/products", (req, res) => {
  const products = readDB();
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  writeDB(products);
  res.status(201).json(newProduct);
});

// Update product
app.put("/api/products/:id", (req, res) => {
  let products = readDB();
  const index = products.findIndex((p) => p.id == req.params.id);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    writeDB(products);
    res.json(products[index]);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// Delete product
app.delete("/api/products/:id", (req, res) => {
  let products = readDB();
  const filtered = products.filter((p) => p.id != req.params.id);
  writeDB(filtered);
  res.json({ message: "Product deleted" });
});

// Start server
app.listen(PORT, () =>
  console.log(` Backend running on http://localhost:${PORT}`)
);


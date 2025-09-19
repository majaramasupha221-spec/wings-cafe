import React, { useState, useEffect } from "react";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";
import Dashboard from "./Dashboard";
import Reporting from "./ReportingModule";
import Sales from "./Sales";
import Customer from "./Customer";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  const handleAdd = (newProduct) => setProducts((prev) => [...prev, newProduct]);
  const handleUpdate = (updated) => setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  const handleDelete = (id) => setProducts((prev) => prev.filter((p) => p.id !== id));

  return (
    <div className="App">
      <h1> Wings Café Inventory System</h1>
      <Dashboard products={products} />
      <ProductForm onAdd={handleAdd} />
      <ProductTable products={products} onDelete={handleDelete} onUpdate={handleUpdate} />
      <Sales products={products} onUpdate={handleUpdate} />
      <Customer />
      <Reporting products={products} />
    </div>
  );
}

export default App;







import React, { useState } from "react";

function ProductForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      }),
    })
      .then((res) => res.json())
      .then((newProduct) => {
        onAdd(newProduct); // update App.js state
        setFormData({ name: "", description: "", category: "", price: "", quantity: "" });
      });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
      <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
      <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
      <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
      <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
      <button type="submit" className="add">Add Product</button>
    </form>
  );
}

export default ProductForm;

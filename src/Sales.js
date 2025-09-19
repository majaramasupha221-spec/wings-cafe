import React, { useState } from "react";

function Sales({ products, onUpdate }) {
  const [selectedId, setSelectedId] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSale = (e) => {
    e.preventDefault();
    if (!selectedId || !quantity) return;

    const product = products.find((p) => p.id == selectedId);
    if (!product || product.quantity < quantity) {
      alert("Not enough stock!");
      return;
    }

    const updated = { ...product, quantity: product.quantity - Number(quantity) };

    fetch(`http://localhost:5000/api/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    })
      .then((res) => res.json())
      .then((data) => {
        onUpdate(data);
        setQuantity("");
      });
  };

  return (
    <div className="sales">
      <h2> Sales Module</h2>
      <form onSubmit={handleSale}>
        <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} required>
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} (Stock: {p.quantity})
            </option>
          ))}
        </select>
        <input
          type="number"
          min="1"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <button type="submit" className="add">Sell</button>
      </form>
    </div>
  );
}

export default Sales;

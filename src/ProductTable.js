import React from "react";

function ProductTable({ products, onDelete, onUpdate }) {
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" })
      .then(() => onDelete(id));
  };

  const handleUpdate = (product) => {
    const updated = { ...product, quantity: product.quantity + 1 }; // Example update
    fetch(`http://localhost:5000/api/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    })
      .then((res) => res.json())
      .then((data) => onUpdate(data));
  };

  return (
    <div className="product-table">
      <h2>Inventory</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Category</th><th>Price</th><th>Quantity</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>${p.price}</td>
              <td>{p.quantity}</td>
              <td>
                <button className="update" onClick={() => handleUpdate(p)}>Update</button>
                <button className="delete" onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;

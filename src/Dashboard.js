

import React from "react";

function Dashboard({ products }) {
  const totalProducts = products.length;
  const lowStock = products.filter((p) => p.quantity < 10).length;
  const totalStock = products.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <div className="dashboard">
      <h2> Dashboard Overview</h2>
      <div className="cards">
        <div className="card">
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </div>
        <div className="card">
          <h3>Low Stock Items</h3>
          <p>{lowStock}</p>
        </div>
        <div className="card">
          <h3>Total Stock</h3>
          <p>{totalStock}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;


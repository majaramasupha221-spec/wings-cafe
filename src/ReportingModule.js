import React from "react";

function Reporting({ products }) {
  const grouped = products.reduce((acc, p) => {
    if (!acc[p.category]) {
      acc[p.category] = { category: p.category, count: 0, qty: 0 };
    }
    acc[p.category].count += 1;
    acc[p.category].qty += p.quantity;
    return acc;
  }, {});

  return (
    <div className="reporting">
      <h2>Reporting Module</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Total Products</th>
            <th>Total Quantity</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(grouped).map((cat, i) => (
            <tr key={i}>
              <td>{cat.category || "Uncategorized"}</td>
              <td>{cat.count}</td>
              <td>{cat.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reporting;

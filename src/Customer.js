import React, { useState } from "react";

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = { id: Date.now(), ...form };
    setCustomers((prev) => [...prev, newCustomer]);
    setForm({ name: "", email: "" });
  };

  return (
    <div className="customer">
      <h2> Customer Module</h2>
      <form onSubmit={handleSubmit} className="customer-form">
        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />
        <button type="submit" className="add">Add Customer</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customer;

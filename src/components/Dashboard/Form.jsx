"use client";

import { use } from "react";

const Form = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = e.target.query.value;
    const location = e.target.location.value;
    const totalLeads = e.target.totalLeads.value;
    const ints = parseInt(totalLeads);
    const userQuery = { query, location, ints };
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userQuery),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="card-body">
        <fieldset className="fieldset">
          <label className="label">Query</label>
          <input
            type="text"
            name="query"
            className="input"
            placeholder="Enter your query"
          />
          <label className="label">Location</label>
          <input
            type="text"
            name="location"
            className="input"
            placeholder="Enter your location"
          />

          <label className="label">Total lead</label>
          <input
            type="number"
            min="1"
            required
            name="totalLeads"
            className="input"
            placeholder="Enter total leads"
          />

          <button className="btn btn-neutral mt-4">Generate Leads</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Form;

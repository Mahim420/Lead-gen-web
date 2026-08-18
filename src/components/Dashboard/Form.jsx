"use client";

import { useState } from "react";
import Modal from "../modals/Modal";

const Form = ({ setLeads }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const query = e.target.query.value;
      const location = e.target.location.value;
      const totalLeads = e.target.totalLeads.value;

      const ints = parseInt(totalLeads);

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          location,
          ints,
        }),
      });

      const data = await res.json();

      if (data.success && data.mongoSaved) {
        setLeads(data.leads);

        console.log(document.getElementById("my_modal_5"));

        document.getElementById("my_modal_5")?.showModal();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset">
            <label className="label">Query</label>
            <input
              type="text"
              required
              name="query"
              className="input"
              placeholder="Enter query"
            />

            <label className="label">Location</label>
            <input
              type="text"
              required
              name="location"
              className="input"
              placeholder="Enter location"
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

            <button className="btn btn-neutral mt-4" disabled={loading}>
              {loading ? (
                <span className="loading loading-dots loading-xl"></span>
              ) : (
                "Generate Leads"
              )}
            </button>
          </fieldset>
        </form>
      </div>

      <Modal />
    </>
  );
};

export default Form;

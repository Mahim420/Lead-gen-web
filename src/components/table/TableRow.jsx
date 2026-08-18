"use client";

import Link from "next/link";
import { useState } from "react";

const TableRow = ({ lead, index }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${lead.displayQuery || lead.query}"?`,
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      const res = await fetch(`/api/leads/${lead._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete lead");
      }

      alert("Lead deleted successfully");

      // Refresh the Server Component
      window.location.reload();
    } catch (error) {
      console.error("Delete error:", error);

      alert(error.message || "Something went wrong");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <tr>
      {/* Serial */}
      <th>{index + 1}</th>

      {/* About / Query */}
      <td>
        <Link
          href={`/dashboard/leads/${lead._id}`}
          className="font-semibold hover:underline"
        >
          {lead.displayQuery || lead.query}
        </Link>
      </td>

      {/* Location */}
      <td>{lead.location}</td>

      {/* Total Count */}
      <td>{lead.leads?.length || 0}</td>

      {/* Actions */}
      <td>
        <div className="flex items-center gap-2">
          {/* View */}
          <Link
            href={`/dashboard/leads/${lead._id}`}
            className="btn btn-sm btn-info"
          >
            View
          </Link>

          {/* Delete */}
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="btn btn-sm btn-error"
          >
            {deleting ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;

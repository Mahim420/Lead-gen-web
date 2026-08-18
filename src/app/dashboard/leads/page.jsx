import TableRow from "@/components/table/TableRow";
import { cookies } from "next/headers";

const getLeads = async () => {
  const cookieStore = await cookies();

  const res = await fetch("http://localhost:3000/api/leads", {
    cache: "no-store",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch leads");
  }

  return data;
};

const Leads = async () => {
  const leads = await getLeads();

  return (
    <div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>About</th>
              <th>Location</th>
              <th>Total Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {leads?.leads?.map((lead, index) => (
              <TableRow key={lead._id} lead={lead} index={index}></TableRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leads;

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDatabase } from "@/app/lib/dbConnect";
import DetailsRow from "@/components/table/DetailsRow";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

const getLead = async (id) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connectToDatabase();

  const user = await db.collection("userCollections").findOne({
    email: session.user.email,
  });

  if (!user) {
    return null;
  }

  const leadDocument = await db.collection("leadCollections").findOne({
    _id: new ObjectId(id),
    userId: user._id,
  });

  return leadDocument;
};

const DetailsPage = async ({ params }) => {
  const { id } = await params;

  const lead = await getLead(id);
  console.log(lead.leads);

  if (!lead) {
    return <h1>Lead not found</h1>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-xs">
        <thead>
          <tr>
            <th></th>
            <th>Company</th>
            <th>Category</th>
            <th>City</th>
            <th>Adress</th>
            <th>Phone</th>
            <th>Map URL</th>
          </tr>
        </thead>
        <tbody>
          {lead?.leads?.map((l, i) => (
            <DetailsRow key={i} l={l}></DetailsRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailsPage;

import { ObjectId } from "mongodb";

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectToDatabase } from "@/app/lib/dbConnect";

export async function GET(request, { params }) {
  try {
    // 1. Session check
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    // 2. URL থেকে id নেওয়া
    const { id } = await params;

    // 3. ObjectId valid কিনা check
    if (!ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid lead ID",
        },
        { status: 400 },
      );
    }

    // 4. Database connection
    const db = await connectToDatabase();

    // 5. Logged-in user খোঁজা
    const user = await db.collection("userCollections").findOne({
      email: session.user.email,
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }

    // 6. শুধু এই user-এর নির্দিষ্ট lead খোঁজা
    const lead = await db.collection("leadCollections").findOne({
      _id: new ObjectId(id),
      userId: user._id,
    });

    // 7. Lead না পাওয়া গেলে
    if (!lead) {
      return Response.json(
        {
          success: false,
          message: "Lead not found",
        },
        { status: 404 },
      );
    }

    // 8. Success response
    return Response.json({
      success: true,
      lead,
    });
  } catch (error) {
    console.error("GET single lead error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch lead",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    // 1. Session check
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    // 2. Get ID
    const { id } = await params;

    console.log("DELETE ID:", id);
    console.log("SESSION EMAIL:", session.user.email);

    // 3. Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid lead ID",
        },
        { status: 400 },
      );
    }

    // 4. Database
    const db = await connectToDatabase();

    // 5. Find logged-in user
    const user = await db.collection("userCollections").findOne({
      email: session.user.email,
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }

    console.log("USER ID:", user._id);

    // 6. Check lead first
    const lead = await db.collection("leadCollections").findOne({
      _id: new ObjectId(id),
    });

    console.log("LEAD FOUND:", lead);

    if (!lead) {
      return Response.json(
        {
          success: false,
          message: "Lead does not exist",
        },
        { status: 404 },
      );
    }

    console.log("LEAD USER ID:", lead.userId);

    // 7. Check ownership
    if (lead.userId.toString() !== user._id.toString()) {
      return Response.json(
        {
          success: false,
          message: "You don't have permission to delete this lead",
        },
        { status: 403 },
      );
    }

    // 8. Delete
    const result = await db.collection("leadCollections").deleteOne({
      _id: new ObjectId(id),
      userId: user._id,
    });

    if (result.deletedCount === 0) {
      return Response.json(
        {
          success: false,
          message: "Failed to delete lead",
        },
        { status: 500 },
      );
    }

    // 9. Success
    return Response.json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    console.error("DELETE LEAD ERROR:", error);

    return Response.json(
      {
        success: false,
        message: error.message || "Failed to delete lead",
      },
      { status: 500 },
    );
  }
}

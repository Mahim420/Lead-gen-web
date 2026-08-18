import client from "@/app/lib/apify";
import { connectToDatabase } from "@/app/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// =====================================================
// GET - Logged-in User-এর সব Leads
// =====================================================

export async function GET(request) {
  try {
    // 1. Session check
    const session = await getServerSession(authOptions);

    console.log("GET Session:", session);

    if (!session?.user?.email) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    // 2. Database connection
    const db = await connectToDatabase();

    // 3. Logged-in user খুঁজে বের করা
    const user = await db.collection("userCollections").findOne({
      email: session.user.email,
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        },
      );
    }

    // 4. শুধু প্রয়োজনীয় fields নেওয়া
    const leads = await db
      .collection("leadCollections")
      .find(
        {
          userId: user._id,
        },
        {
          projection: {
            query: 1,
            queryNumber: 1,
            displayQuery: 1,
            location: 1,
            totalRequested: 1,
            status: 1,
            leads: 1,
            createdAt: 1,
          },
        },
      )
      .sort({
        createdAt: -1,
      })
      .toArray();

    // 5. Response
    return Response.json({
      success: true,
      total: leads.length,
      leads,
    });
  } catch (error) {
    console.error("GET /api/leads error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch leads",
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}

// =====================================================
// POST - Generate Leads + Save MongoDB
// =====================================================

export async function POST(request) {
  try {
    // =================================================
    // 1. Session check
    // =================================================

    const session = await getServerSession(authOptions);

    console.log("POST Session:", session);

    if (!session?.user?.email) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    // =================================================
    // 2. Frontend থেকে data নেওয়া
    // =================================================

    const body = await request.json();

    const { query, location, ints } = body;

    // Validation
    if (!query || !location || !ints) {
      return Response.json(
        {
          success: false,
          message: "Query, location and total leads are required",
        },
        {
          status: 400,
        },
      );
    }

    // String clean করা
    const cleanQuery = query.trim();
    const cleanLocation = location.trim();

    // Number নিশ্চিত করা
    const totalRequested = Number(ints);

    if (Number.isNaN(totalRequested) || totalRequested <= 0) {
      return Response.json(
        {
          success: false,
          message: "Total leads must be a valid number",
        },
        {
          status: 400,
        },
      );
    }

    // =================================================
    // 3. Apify Actor Input
    // =================================================

    const input = {
      searchStringsArray: [cleanQuery],
      locationQuery: cleanLocation,
      maxCrawledPlacesPerSearch: totalRequested,
      language: "en",
    };

    // =================================================
    // 4. Apify Actor Run
    // =================================================

    const run = await client.actor("2Mdma1N6Fd0y3QEjR").call(input);

    // =================================================
    // 5. Apify Dataset থেকে results নেওয়া
    // =================================================

    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    console.log("Apify items:", items.length);

    // =================================================
    // 6. কোনো lead না পাওয়া গেলে
    // =================================================

    if (!items || items.length === 0) {
      return Response.json(
        {
          success: false,
          message: "No leads found",
        },
        {
          status: 404,
        },
      );
    }

    // =================================================
    // 7. Apify Data Filter
    // =================================================

    const filteredLeads = items.map((item) => ({
      title: item.title || "",
      subTitle: item.subTitle || "",
      description: item.description || "",
      price: item.price || "",
      categoryName: item.categoryName || "",

      address: item.address || "",
      neighborhood: item.neighborhood || "",
      street: item.street || "",
      city: item.city || "",
      postalCode: item.postalCode || "",
      state: item.state || "",
      countryCode: item.countryCode || "",

      website: item.website || "",
      phone: item.phone || "",
      phoneUnformatted: item.phoneUnformatted || "",

      url: item.url || "",
      searchPageUrl: item.searchPageUrl || "",
      searchString: item.searchString || "",

      imageUrl: item.imageUrl || "",
    }));

    // =================================================
    // 8. Database connection
    // =================================================

    const db = await connectToDatabase();

    const collection = db.collection("leadCollections");

    // =================================================
    // 9. Logged-in User খুঁজে বের করা
    // =================================================

    const user = await db.collection("userCollections").findOne({
      email: session.user.email,
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        },
      );
    }

    // =================================================
    // 10. একই user + একই query + একই location
    //     আগে কতবার search হয়েছে
    // =================================================

    const existingCount = await collection.countDocuments({
      userId: user._id,

      query: cleanQuery.toLowerCase(),

      location: cleanLocation.toLowerCase(),
    });

    // =================================================
    // 11. Query Number
    // =================================================

    const queryNumber = existingCount + 1;

    // =================================================
    // 12. Display Query
    // =================================================

    let displayQuery;

    if (queryNumber === 1) {
      displayQuery = cleanQuery;
    } else {
      displayQuery = `${cleanQuery} ${queryNumber}`;
    }

    // =================================================
    // 13. MongoDB Document
    // =================================================

    const leadDocument = {
      userId: user._id,

      // Original query
      query: cleanQuery.toLowerCase(),

      // 1, 2, 3...
      queryNumber: queryNumber,

      // UI তে দেখানোর জন্য
      // university
      // university 2
      // university 3
      displayQuery: displayQuery,

      // Location
      location: cleanLocation.toLowerCase(),

      // User কতগুলো চেয়েছিল
      totalRequested: totalRequested,

      // Status
      status: "completed",

      // Generated leads
      leads: filteredLeads,

      // Creation time
      createdAt: new Date(),
    };

    // =================================================
    // 14. MongoDB Save
    // =================================================

    const result = await collection.insertOne(leadDocument);

    console.log("MongoDB Inserted ID:", result.insertedId);

    // =================================================
    // 15. Success Response
    // =================================================

    return Response.json(
      {
        success: true,

        mongoSaved: result.acknowledged,

        insertedId: result.insertedId,

        query: cleanQuery,

        queryNumber: queryNumber,

        displayQuery: displayQuery,

        location: cleanLocation,

        totalRequested: totalRequested,

        status: "completed",

        leads: filteredLeads,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    // =================================================
    // Error Handler
    // =================================================

    console.error("POST /api/leads error:", error);

    return Response.json(
      {
        success: false,
        message: error.message || "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}

import { ApifyClient } from "apify-client";

const client = new ApifyClient({
  token: process.env.APIFY_TOKEN,
});

export async function POST(request) {
  try {
    // Frontend থেকে data নেওয়া
    const body = await request.json();

    const { query, location, ints } = body;

    console.log("Body:", body);
    console.log("totalLeads:", ints);
    console.log("type:", typeof ints);

    const maxLeads = parseInt(ints, 10);

    console.log("maxLeads:", maxLeads);
    console.log("isInteger:", Number.isInteger(maxLeads));

    // যদি number ঠিক না হয়
    if (!Number.isInteger(maxLeads)) {
      return Response.json(
        {
          success: false,
          message: "Total Leads must be a valid integer",
        },
        {
          status: 400,
        },
      );
    }

    // Actor Input
    const input = {
      searchStringsArray: [query],
      locationQuery: location,
      maxCrawledPlacesPerSearch: maxLeads,
      language: "en",
    };

    console.log("Input:", input);

    // Actor Run
    const run = await client.actor("2Mdma1N6Fd0y3QEjR").call(input);

    console.log("Run Result:", run);

    // Dataset থেকে Result আনা
    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    console.log("Leads:", items);

    return Response.json({
      success: true,
      total: items.length,
      leads: items,
    });
  } catch (error) {
    console.error("Apify Error:", error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET() {
  return Response.json({
    success: true,
    message: "API Working",
  });
}

export async function GET(req) {
  return Response.json({
    status: 200,
    message: "server is running",
  });
}

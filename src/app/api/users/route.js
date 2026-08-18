import { connectToDatabase } from "@/app/lib/dbConnect";

export async function POST(request) {
  const { name, email, password } = await request.json();
  console.log("Registering user:", { name, email, password });

  const db = await connectToDatabase();
  const existingUser = await db
    .collection("userCollections")
    .findOne({ email });

  if (existingUser) {
    return new Response(JSON.stringify({ message: "User already exists" }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const newUser = {
    name,
    email,
    password,
    createdAt: new Date(), // In a real application, make sure to hash the password before storing it
  };

  await db.collection("userCollections").insertOne(newUser);

  return new Response(
    JSON.stringify({ message: "User registered successfully" }),
    {
      headers: { "Content-Type": "application/json" },
    },
  );
}

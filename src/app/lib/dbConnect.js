import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const client = new MongoClient(uri);

export async function connectToDatabase() {
  const clientPromise = client.connect();
  const db = (await clientPromise).db("LeadGen");
  return db;
}

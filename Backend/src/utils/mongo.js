import { MongoClient } from "mongodb";

let db;

export async function connectMongo() {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  db = client.db();
  console.log(" MongoDB connected");
}

export function getMongoDb() {
  return db;
}
import * as dotenv from "dotenv";
import { Collection, Db, MongoClient } from "mongodb";

async function ConectToDB(): Promise<Db> {
  dotenv.config();
  const client: MongoClient = new MongoClient(process.env.MONGO_URI || "");

  await client.connect();

  return client.db(process.env.MONGO_DATABASE);
}

export async function GetCollection(
  collectionName: string
): Promise<Collection> {
  const db = await ConectToDB();
  const collection = db.collection(collectionName);
  return collection;
}

import * as dotenv from "dotenv";
import { Collection, Db, MongoClient } from "mongodb";

const database = ConectToDB();

async function ConectToDB(): Promise<Db> {
  dotenv.config();
  const client: MongoClient = new MongoClient(process.env.MONGO_URI || "");

  await client.connect();

  return client.db(process.env.MONGO_DATABASE);
}

export async function GetCollection(
  collectionName: string
): Promise<Collection> {
  const collection = (await database).collection(collectionName);
  return collection;
}

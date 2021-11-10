import { MongoClient } from 'mongodb';

export const connectDB = async () => {
  const client = await MongoClient.connect(process.env.DB_URL);
  return client;
};

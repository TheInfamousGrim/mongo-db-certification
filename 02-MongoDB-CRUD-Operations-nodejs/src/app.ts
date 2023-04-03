import { MongoClient, ObjectId } from 'mongodb';
import { config } from 'dotenv';
config();

console.log(process.env.MONGODB_CONNECTION_STRING);

const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);
const dbname = 'bank';

// New account to be added
const account = {
  _id: new ObjectId(),
  account_id: 'MDB955769550',
  account_holder: 'Addison Shelton',
  account_type: 'Checking',
  balance: 1971.89,
  transfers_complete: [
    'TR62810552',
    'TR45686813',
    'TR54645848',
    'TR44538463',
    'TR36887388',
    'TR48673521',
    'TR87983418',
    'TR44543354',
  ],
  address: {
    city: 'Ridgewood',
    zip: 11385,
    street: 'Menhan 51',
    number: 1712,
  },
};

// Filter query

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`Connected to the ${dbname} database 🌍`);
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`);
  }
};

const main = async () => {
  try {
    // Connect to the database
    await connectToDatabase();
    // Get the correct collection in mongodb
    const collection = client.db(dbname).collection('accounts');
    // Replace the document in the database
    const result = await collection.insertOne(account);
    console.log(result);
  } catch (err) {
    console.error(`Error connection to the database: ${err}`);
  } finally {
    await client.close();
  }
};

// Run the main function
main();

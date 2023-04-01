import { MongoClient } from "mongodb";
import { config } from "dotenv";
config();

console.log(process.env.MONGODB_CONNECTION_STRING);

const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);
const dbname = "bank";

const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log(`Connected to the ${dbname} database 🌍`);
    } catch (err) {
        console.error(`Error connecting to the database: ${err}`);
    }
}

const main = async () => {
    try {
        await connectToDatabase();
    } catch (err) {
        console.error(`Error connection to the database: ${err}`);
    } finally {
        await client.close();
    }
}

// Run the main function
main();

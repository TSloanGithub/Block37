import pg from 'pg';

const { Client } = pg;

const DATABASE_URL = process.env.DATABASE_URL || "postgres://localhost:5432/book_fair";

const client = new Client({
    connectionString: DATABASE_URL,
});

export const connectDB = async () => {
    try {
        await client.connect();
        console.log(`Connected to database at ${DATABASE_URL}`);

        await client.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        `);
    } catch (e) {
        console.error(`Failed to connect to ${DATABASE_URL}`, e);
        throw e; 
    }
};

export default client;

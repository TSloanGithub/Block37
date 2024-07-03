import pg from 'pg'

const { Client } = pg;

const DATABASE_URL = process.env.DATABASE_URL || "postgres://localhost:5432/book_fair"

const client = new Client(DATABASE_URL);

export const connectDB = async () => {
    try{
        await client.connect();

        await client.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
            `)
    }catch(e){
        console.error(`Failure to connect to ${DATABASE_URL}`)
    }
}

export default client;
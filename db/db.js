import pg from 'pg'

const { Client } = pg;

const DATABASE_URL = process.env.DATABASE_URL || "postgres://localhost:3001/book_fair"

export const client = new Client(DATABASE_URL);

export const connectDB = async () => {
    try{

    }catch(e){
        console.error(`Failure to connect to ${DATABASE_URL}`)
    }
}
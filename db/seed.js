import client from "./db.js"
import { connectDB } from "./db.js"
import { createUser } from "./users.js"

const dropTables = async()=>{
    try{
        await client.query(`DROP TABLE IF EXISTS users CASCADE`)
        await client.query(`DROP TABLE IF EXISTS products CASCADE`)
        await client.query(`DROP TABLE IF EXISTS reviews CASCADE`)
        await client.query(`DROP TABLE IF EXISTS cart CASCADE`)
        await client.query(`DROP TABLE IF EXISTS orders CASCADE`)
        await client.query(`DROP TABLE IF EXISTS orderItems CASCADE`)
    }catch(e){
        console.log(e);
    }
}


const createTables = async ()=>{
    try{
        await client.query(`
            CREATE TABLE IF NOT EXISTS users(
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                username VARCHAR(255),
                password VARCHAR(255)
            )
        `)
        await client.query(`
            CREATE TABLE IF NOT EXISTS products(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price MONEY NOT NULL,
                details VARCHAR(255),
                inStock BOOLEAN,
                quantity INTEGER NOT NULL
            )
        `)
        await client.query(`
            CREATE TABLE IF NOT EXISTS reviews(
                id SERIAL PRIMARY KEY,
                products_id INTEGER REFERENCES products(id) NOT NULL,
                users_id uuid REFERENCES users(id) NOT NULL,
                rating INTEGER CHECK (rating BETWEEN 0 and 6),
                comments VARCHAR(400)
            )
        `)
        await client.query(`
            CREATE TABLE IF NOT EXISTS cart(
                id SERIAL PRIMARY KEY,
                products_id INTEGER REFERENCES products(id) NOT NULL,
                users_id uuid REFERENCES users(id),
                quantity INTEGER CHECK (quantity BETWEEN 0 and 100),
                price MONEY NOT NULL
            )
        `)
        await client.query(`
            CREATE TABLE IF NOT EXISTS orders(
                id SERIAL PRIMARY KEY,
                users_id uuid REFERENCES users(id) NOT NULL,
                products_id INTEGER REFERENCES products(id) NOT NULL,
                orderTotal MONEY NOT NULL,
                orderDate TIMESTAMP DEFAULT now(),
                productPrice MONEY NOT NULL,
                quantity INTEGER CHECK (quantity BETWEEN 0 and 1000)
            )
        `)
        await client.query(`
            CREATE TABLE IF NOT EXISTS orderItems(
                id SERIAL PRIMARY KEY,
                products_id INTEGER REFERENCES products(id) NOT NULL,
                quantity INTEGER CHECK (quantity BETWEEN 0 and 1000),
                price MONEY NOT NULL
            )
        `)
    }catch(e){
        console.error("Failure to seed", e)
    }
}

const createInitialData = async()=>{
    try{
        await createUser({
            username: "tyler",
            password: "password123"
        })
    }catch(e){
        console.error('Failure to initialize data')
    }
}

const rebuildDB = async()=>{
    try{
        await connectDB();
        await dropTables();
        await createTables();
        await createInitialData();
    }catch(e){
        console.error('Failed to rebuild database')
    }finally{
        client.end();
    }
}
rebuildDB();
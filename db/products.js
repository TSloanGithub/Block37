import client from "./db.js";

/* Put this here so that I can see what I need to use for my createProduct
    CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price MONEY NOT NULL,
    details VARCHAR(255),
    inStock BOOLEAN,
    quantity INTEGER NOT NULL*/
    

const getAllProducts = async()=>{
    try{
        const { rows } = await client.query('SELECT * FROM products')
        console.log("all products:",rows);
        return rows;

    }catch(e){
        console.error('Failure to get all products')
    }
}

const getProductByID = async(id)=>{
    try{
        const { rows } = await client.query('SELECT * FROM products WHERE id = $1',[id])
        console.log(`Product ${id}`, rows);
        return rows;
    }catch(e){
        console.error('failed to get product by ID')
    }
}

const createProduct = async({name, price, details, inStock, quantity})=>{
    try{
        const { rows } = await client.query(`
            INSERT into products(name, price, details, inStock, quantity)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            `,[name, price, details, inStock, quantity])
            console.log("created product:", rows)
            return rows[0];
    }catch(e){
        console.error('Failed to create product',e)
    }
}

export{
    getAllProducts,
    getProductByID,
    createProduct
}
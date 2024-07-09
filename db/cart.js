import client from "./db.js";

/* 
    Create table script for reference:
    CREATE TABLE IF NOT EXISTS carts(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
*/

const getAllCarts = async () => {
    try {
        const { rows } = await client.query('SELECT * FROM carts');
        console.log("All carts:", rows);
        return rows;
    } catch (e) {
        console.error('Failure to get all carts', e);
    }
}

const getCartByID = async (id) => {
    try {
        const { rows } = await client.query('SELECT * FROM carts WHERE id = $1', [id]);
        console.log(`Cart ${id}:`, rows);
        return rows;
    } catch (e) {
        console.error('Failed to get cart by ID', e);
    }
}

const getCartByUserID = async (user_id) => {
    try {
        const { rows } = await client.query('SELECT * FROM carts WHERE user_id = $1', [user_id]);
        console.log(`Carts for user ${user_id}:`, rows);
        return rows;
    } catch (e) {
        console.error('Failed to get carts by user ID', e);
    }
}

const createCart = async ({ user_id, product_id, quantity }) => {
    try {
        const { rows } = await client.query(`
            INSERT INTO carts (user_id, product_id, quantity)
            VALUES ($1, $2, $3)
            RETURNING *
        `, [user_id, product_id, quantity]);
        console.log("Created cart:", rows);
        return rows[0];
    } catch (e) {
        console.error('Failed to create cart', e);
    }
}

const deleteCart = async (id) => {
    try {
        const { rows } = await client.query('DELETE FROM carts WHERE id = $1 RETURNING *', [id]);
        console.log(`Deleted cart ${id}:`, rows);
        return rows[0];
    } catch (e) {
        console.error('Failed to delete cart', e);
    }
}

export {
    getAllCarts,
    getCartByID,
    getCartByUserID,
    createCart,
    deleteCart
}

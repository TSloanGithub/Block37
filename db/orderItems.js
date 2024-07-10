import client from "./db.js";
import {getAllOrderItems} from "./cart.js"; 

const getAllOrderItems = async () =>{
    try{
        const {rows} = await client.query(`SELECT * FROM orderItems`);
        console.log('All Order Items:', rows);
        return rows; 
    }catch(e){
        console.error('Failed to get all order items', e);
    }
};

const getOrderItemsByOrderId = async (order_id) =>{
    try{
        const {rows} = await client.query(`SELECT * FROM orderItems WHERE order_id = $1`, [order_id]);
        console.log(`Order Items for Order ID ${order_id}`, rows);
        return rows; 
    } catch(e){
        console.error(`Failed to retrieve order items by order ID`, e);
    }
};

const createOrderItem = async ({order_id, product_id, quantity, price}) =>{
    try{
        const {rows} = await client.query(`
        INSERT INTO orderItems(order_id, product_id, quantity, price)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `, [order_id, product_id, quantity, price]);
        console.log("Created Order Item:", rows);
        return rows; 
    }catch(e){
        console.log('Failed to create order item', e);
    }
};

export {
    getAllOrderItems,
    getOrderItemsByOrderId, 
    createOrderItem
};



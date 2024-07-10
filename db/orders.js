import { getCartByUserID } from "./cart.js";
import client from "./db.js";

//table name is: "orders"
const getAllOrders = async ()=>{
    try{
        const { rows } = await client.query(`SELECT * FROM orders`)
        console.log('All Orders:',rows);
        return rows;

    }catch(e){
        console.error('Failed to get all orders')
    }
}

const getOrdersByUserId = async (users_id) =>{
    try{
        const { rows } = await client.query(`SELECT * FROM orders WHERE users_id = $1`,[users_id])
        console.log(`orders:`,rows)
        return rows;
    }catch(e){
        console.error(`Failed to retrieve orders by id`,e)
    }
}



//"+" forces the type to be a number, substring returns the string starting at the specified index
const createOrder = async({users_id})=>{
    try{
        const cart = await getCartByUserID(users_id)
        const orderTotal = cart.reduce((acc, item)=>{
            return acc + (+item.price.substring(1)) * item.quantity
        },0)
        const { rows } = await client.query(`
            INSERT INTO orders(users_id, orderTotal)
            VALUES ($1, $2)
            RETURNING *
            `,[users_id, orderTotal])
        console.log("Created Order:", rows)
        return rows;
    }catch(e){
        console.error('Failed to create order',e)
    }
}


export{
    getAllOrders,
    getOrdersByUserId,
    createOrder
}
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
        const { rows } = await client.query(`SELECT * FROM orders WHERE username = $1`,[users_id])
        console.log(`orders:`,rows)
        return rows;
    }catch(e){
        console.error(`Failed to retrieve orders by id`)
    }
}

// const getOrdersByProductName = async (name)

// const createOrder = async()


export{
    getAllOrders,
    getOrdersByUserId
}
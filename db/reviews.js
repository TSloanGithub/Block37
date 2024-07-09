import client from "./db.js";

const getAllReviews = async()=>{
    try{
        const { rows } = await client.query('SELECT * FROM reviews')
        console.log(rows);
        return rows;
    }catch(e){
        console.error("Failure to get all product reviews")
    }
}

const getReviewByProductId = async(products_id)=>{
    try{
        const { rows } = await client.query(`SELECT * FROM reviews where products_id = $1`,[products_id])
        console.log(rows)
        return rows;
    }catch(e){
        console.error(`Failed to get reviews for product of id: ${products_id}`)
    }
}

const getReviewByUserId = async(users_id)=>{
    try{
        const { rows } = await client.query(`SELECT * FROM reviews where users_id = $1`,[users_id])
        console.log(rows)
        return rows;
    }catch(e){
        console.error(`Failed to get reviews for user: ${users_id}`)
    }
}
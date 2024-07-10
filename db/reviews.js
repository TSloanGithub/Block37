import client from "./db.js";

const getAllReviews = async()=>{
    try{
        const { rows } = await client.query('SELECT * FROM reviews')
        console.log("ALL REVIEWS:", rows);
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

const createReview = async({products_id, users_id, rating, comments})=>{
    try{
        const { rows } = await client.query(`
            INSERT into reviews(products_id, users_id, rating, comments)
            VALUES ($1, $2, $3, $4)
            RETURNING *
            `,[products_id, users_id, rating, comments])
        console.log("created review:", rows)
        return rows[0];
    }catch(e){
        console.error('Failure to create product review',e)
    }
}

export{
    getAllReviews,
    getReviewByUserId,
    getReviewByProductId,
    createReview
}
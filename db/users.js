import client from "./db.js";
import bcrypt from "bcrypt"
const salt_count = 10;

const getAllUsers = async () =>{
    try{
        const { rows } = await client.query(`SELECT * FROM users`)
        console.log("selected users", rows)
        return rows;
    }catch(e){
        console.error('Failed to get all users')
    }
}

const getUserByUsername = async (username) =>{
    try{
        const { rows } = await client.query(`SELECT * FROM users WHERE username = $1`,[username])
        console.log("selected user:", rows)
        return rows;
    }catch(e){
        console.error(`Failure to retrieve ${username}`)
    }
}

const createUser = async({username, password})=>{
    try{
        const hashedPassword = await bcrypt.hash(password, salt_count)

        const { rows } = await client.query(`
            INSERT INTO users (username, password)
            values($1, $2)
            RETURNING *
            `,[username, hashedPassword])
        return rows[0];
    }catch(e){
        console.error('Failure to create new user',e)
    }
}


export {
    getAllUsers,
    getUserByUsername,
    createUser
}
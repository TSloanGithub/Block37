const express = require("express");
const app = express(); 
const path = require("path"); 
const cors = require("cors"); 

require("dotenv").config(); 
const pg = require("pg"); 

const client = new pg.Client(
    process.env.DATABASE_URL || "postgres://localhost:3001/book_fair"
)

const init = async() =>{
    try{

    }catch(error){
        console.log(error)
    }
}
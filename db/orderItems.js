const getOrdersByProductName = async (name) =>{
    try{
        const { rows } = await client.query(`SELECT * FROM orders WHERE`)
    }catch(e){
        console.error
    }
}
import express from 'express'; 
import {getAllOrders, getOrdersByUserId } from '../db/orders.js';
// getOrdersByProductName

const router = express.Router();

router.get('/orders', async(req, res) =>{
    try{
        const orders = await getAllOrders(); 
        res.status(200).json(orders); 
    }catch(e){
        res.status(500).json({error: 'failed to get all orders'});
    }
});

router.get('/orders/user/:userId', async(req, res) =>{
    const userId = req.params.userId;
    try{
        const orders = await getOrdersByUserId(userId);
        res.status(200).json(orders);
    }catch(e){
        res.status(500).json({error: `failed to get orders for user ID ${userId} `}); 
    }
}); 

router.get('/orders/products/:productName', async (req, res) => {
    const productName = req.params.productName; 
    try{
        const orders = await getOrdersByProductName(productName);
        res.status(200).json(orders); 
    } catch(e) {
        res.status(500).json({error: `failed to get orders for product name ${productName}`});
    }
});

export default router;
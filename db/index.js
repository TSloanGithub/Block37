import express from 'express';
import { getAllOrderItems, getOrderItemsByOrderId, createOrderItem } from '../db/orderItems.js';

const router = express.Router();

router.get('/orderItems', async(req, res) =>{
    try{
        const orderItems = await getAllOrderItems();
        res.status(200).json(orderItems);
    } catch(e){
        res.status(500).json({error: 'failed to get all order itmes'});
    }
});

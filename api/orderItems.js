import express from 'express';
import { getAllOrderItems, getOrderItemsByOrderId, createOrderItem } from '../db/orderItems.js';

const router = express.Router();

router.get('/orderItems', async (req, res) => {
    try {
        const orderItems = await getAllOrderItems();
        res.status(200).json(orderItems);
    } catch (e) {
        res.status(500).json({ error: 'Failed to get all order items' });
    }
});

router.get('/orderItems/order/:orderId', async (req, res) => {
    const { orderId } = req.params;
    try {
        const orderItems = await getOrderItemsByOrderId(orderId);
        res.status(200).json(orderItems);
    } catch (e) {
        res.status(500).json({ error: `Failed to get order items for order ID ${orderId}` });
    }
});

router.post('/orderItems', async (req, res) => {
    const { order_id, product_id, quantity, price } = req.body;
    try {
        const newOrderItem = await createOrderItem({ order_id, product_id, quantity, price });
        res.status(201).json(newOrderItem);
    } catch (e) {
        res.status(500).json({ error: 'Failed to create order item' });
    }
});

export default router;

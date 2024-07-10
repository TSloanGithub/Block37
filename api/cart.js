import express from 'express';
import { getAllCarts, getCartByID, getCartByUserID, createCart, deleteCart } from '../db/cart.js';

const router = express.Router();

router.get('/carts', async (req, res) => {
    try {
        const carts = await getAllCarts();
        res.status(200).json(carts);
    } catch (e) {
        res.status(500).json({ error: 'Failed to get all carts' });
    }
});

router.get('/carts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const cart = await getCartByID(id);
        if (cart.length === 0) {
            res.status(404).json({ error: `Cart with ID ${id} not found` });
        } else {
            res.status(200).json(cart);
        }
    } catch (e) {
        res.status(500).json({ error: `Failed to get cart by ID ${id}` });
    }
});

router.get('/carts/user/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const carts = await getCartByUserID(user_id);
        res.status(200).json(carts);
    } catch (e) {
        res.status(500).json({ error: `Failed to get carts for user ID ${user_id}` });
    }
});

router.post('/carts', async (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    try {
        const newCart = await createCart({ user_id, product_id, quantity });
        res.status(201).json(newCart);
    } catch (e) {
        res.status(500).json({ error: 'Failed to create cart' });
    }
});

router.delete('/carts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCart = await deleteCart(id);
        if (deletedCart) {
            res.status(200).json(deletedCart);
        } else {
            res.status(404).json({ error: `Cart with ID ${id} not found` });
        }
    } catch (e) {
        res.status(500).json({ error: `Failed to delete cart by ID ${id}` });
    }
});

export default router;

import express from 'express';
import {
    getAllReviews,
    getReviewByProductId,
    getReviewByUserId,
    createReview
} from './db/review.js';

const router = express.Router();

router.get('/reviews', async (req, res) => {
    try {
        const reviews = await getAllReviews();
        res.json(reviews);
    } catch (e) {
        res.status(500).json({ error: 'Failed to get all reviews' });
    }
});

router.get('/reviews/product/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        const reviews = await getReviewByProductId(productId);
        res.json(reviews);
    } catch (e) {
        res.status(500).json({ error: `Failed to get reviews for product ID: ${productId}` });
    }
});

router.get('/reviews/user/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const reviews = await getReviewByUserId(userId);
        res.json(reviews);
    } catch (e) {
        res.status(500).json({ error: `Failed to get reviews for user ID: ${userId}` });
    }
});

router.post('/reviews', async (req, res) => {
    const { products_id, users_id, rating, comments } = req.body;
    try {
        const newReview = await createReview({ products_id, users_id, rating, comments });
        res.status(201).json(newReview);
    } catch (e) {
        res.status(500).json({ error: 'Failed to create review' });
    }
});

export default router;

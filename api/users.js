import express from 'express';
import { getAllUsers, getUserByUsername, createUser } from '../db/users.js'; 
const router = express.Router();
router.get('/users', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (e) {
        console.error('Failed to get all users', e);
        res.status(500).json({ error: 'Failed to get all users' });
    }
});

router.get('/users/:username', async (req, res) => {
    try {
        const user = await getUserByUsername(req.params.username);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (e) {
        console.error(`Failed to retrieve user ${req.params.username}`, e);
        res.status(500).json({ error: `Failed to retrieve user ${req.params.username}` });
    }
});

router.post('/users', async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = await createUser({ username, password });
        res.status(201).json(newUser);
    } catch (e) {
        console.error('Failed to create new user', e);
        res.status(500).json({ error: 'Failed to create new user' });
    }
});

export { router as userRoutes };

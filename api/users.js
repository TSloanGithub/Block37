import express from 'express';
import { getAllUsers, getUserByUsername, createUser } from '../db/users.js'; 
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const router = express.Router();

const jwt_secret = "12345"

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

router.post("/users/login", async (req,res)=>{
    try{
        const { username, password} = req.body
        const customer = await getUserByUsername(username)

        if(customer){

            if(await bcrypt.compare(password, customer.password)){
                const token = jwt.sign(
                    {
                        id: customer.id,
                        username: customer.username
                    }, jwt_secret,
                    {expiresIn: "1w"}
                )
                res.send({message: "login successful!", token:token})
            }else{
                res.send({message: "password does not match!!"})
            }
        }else{
                res.send({message: "user not found!"})
            }
        }catch(e){
        console.error('Failed to log in', e)
    }});

export { router as userRoutes };

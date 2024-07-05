import express from 'express';
import bodyParser from 'body-parser';
import { connectDB } from './db/db.js'; 
import { userRoutes } from './api/users.js'; 

const app = express();
const port = process.env.PORT || 5432;

app.use(bodyParser.json());
app.use('/api', userRoutes);

const startServer = async () => {
    try {
        await connectDB(); 
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to connect to database:', error);
    }
};

startServer();

import express from 'express';
import productsRouter from './api/products.js';
import bodyParser from 'body-parser';
import userRoutes  from './api/users.js'; 
import orderRouter from './api/orders.js';
import cartRouter from "./api/cart.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './db.js'; 

const app = express();
const PORT = process.env.PORT || 5432;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(bodyParser.json());
app.use('/api', productsRouter, userRoutes , orderRouter, cartRouter );

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((e) => {
    console.error('Failed to connect to the database', e);
    process.exit(1);
});

import express from 'express'; 
import {getAllProducts, getProductByID, createProduct} from './db/products.js';

const router = express.Router(); 

router.get('/products', async(req, res) =>{
    try{
        const products = await getAllProducts();
        res.status(200).json(products);
    }catch(e){
        res.status(500).json({error: 'failed to get all products'});
    }
});

router.get('/products/:id', async(req, res) =>{
    const {id} = req.params; 
    try{
        const product = await getProductByID(id); 
        if (product.length === 0){
            res.status(404).json({error: `product with ID ${id} not found`});
        }else{
            res.status(200).json(product);
        }
    } catch(e){
        res.status(500).json({error: `failed to get product by ID ${id}`});
    }
}); 

router.post('/products', async(req, res) =>{
    const {name, price, details, inStock, quantity} = req.body;
    try{
        const newProduct = await createProduct({name, price, details, inStock, quantity});
        res.status(201).json(newProduct);
    }catch(e){
        res.status(500).json({error: 'failed to create product'});
    }
});

export default router; 
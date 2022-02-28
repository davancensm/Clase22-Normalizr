const express = require('express');
const productManager = require('../managers/ProductManager')


const products = new productManager();

const router = express.Router();

router.get('/products', (req,res) =>{
    const allProducts = products.getAll().then((data) => res.send(data));
})

router.post('/products', (req,res) => {
    const producto = req.body
    products.save(producto)
})

module.exports = router;
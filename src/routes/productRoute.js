// Product Endpoints

const express = require('express');

const Product = require('../models/product.js');
const { getViewProduct, getAddProduct, getEditProduct, deleteProduct } = require('../controllers/productCtrl');

const router = express.Router();

// View product
router.get('/api/product/:prodId', getViewProduct);

// Create or add products 
router.post('/api/add-product', getAddProduct);

// Edit product
router.put('/api/edit-product/:prodId', getEditProduct);

// Remove or Delete product
router.delete('/api/delete-product/:prodId', deleteProduct);


module.exports = router;
// Product Endpoints

const express = require('express');

const Product = require('../models/product.js');
const { getViewProduct, postAddProduct, getEditProduct, postDeleteProduct } = require('../controllers/productCtrl');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// View product
router.get('/api/product/:prodId', getViewProduct);

// Create or add products 
router.post('/api/add-product', adminAuth, postAddProduct);

// Edit product
router.put('/api/edit-product/:prodId', adminAuth, getEditProduct);

// Remove or Delete product
router.delete('/api/delete-product/:prodId', adminAuth, postDeleteProduct);


module.exports = router;
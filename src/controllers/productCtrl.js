const express = require('express');

const Products = require('../models/product');
const Category = require('../models/category');

exports.getAllProducts = async (req, res, next) => {
    
    const products = await Products.find();

    const response = res.status(200).json({ message: 'all products', data: products });

    return response;
}
exports.getViewProduct = async (req, res, next) => {
    let productId = req.params.prodId;

    try {
        const product = await Products.findById(productId);

        if (!product) {
            const error = new Error('unprocessible entity');
            error.statusCode = 422;
            error.message = 'no product found';
            throw error;
        };

        return res.status(200).json({
            message: 'product found',
            product: product
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
            status: error.status
        })
    };
};

exports.postAddProduct = async (req, res, next) => {
    let productName = req.body.productname;
    let description = req.body.description;
    let categoryName = req.body.category;

    const productItem = new Products({
        productName,
        description,
        category: categoryName
    });

    try {
        const category = await Category.findOne({ categoryName });

        if (!category) {
            let error = new Error();
            error.statusCode = 422;
            error.message = 'category doesnt exist';
            throw error;
        }
        console.log(category, ' CATEGORY ---------------')

        const newProduct = await productItem.save();

        res.status(201).json({
            messasge: 'product created',
            product: newProduct
        });
    } catch (error) {
        console.log(error);
        if (!error.statusCode) {
            error.statusCode = 500;
        };
        next(error);
    };
};

exports.getEditProduct = async(req, res, next) => {
    const productId = req.params.prodId;

    const productName = req.body.productName;
    const description = req.body.description;
    const category = req.body.category;
    console.log(productName)

    try {
        const product = await Products.findById(productId);

        if (!product) {
            const error = new Error('unprocessible entity');
            error.statusCode = 422;
            error.message = 'no product found';
            throw error;
        };

        product.productName = productName;
        product.description = description;
        product.category = category;
        
        const editedProduct = await product.save();
        
        // if it doesnt return a saved product then there is a server error
        if (!editedProduct) {
            const error = new Error('server error');
            error.statusCode = 500;
            error.message = 'no product found';
            throw error;
        };

        return res.status(201).json({
            message: 'product edited',
            product: editedProduct
        });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode).json({
            message: error.message,
            code: error.statusCode
        })
    };
};

exports.postDeleteProduct = async (req, res, next) => {
    const productId = req.params.prodId;

    try {
        const product = await Products.findById(productId);

        if (!product) {
            const error = new Error('unprocessible entity');
            error.statusCode = 422;
            error.message = 'no product found';
            throw error;
        };

        const deletedProduct = await Products.findByIdAndRemove(product);

        res.status(200).json({
            message: 'product deleted',
            result: deletedProduct
        });
    } catch (error) {
        console.log(error);
    };
};
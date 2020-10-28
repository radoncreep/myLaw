const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const Category = require('../models/category');

// Add Category
exports.postAddCategory = async (req, res, next) => {
    const categoryName = req.body.name;

    // create category instance
    try {
        const name = await Category.findOne({ categoryName });

        if (name) {
            const error = new Error();
            error.statusCode = 422;
            error.message = 'The Category you are trying to add already exist';
            throw error;
        };

        const category = new Category({ categoryName });
        const newCategory = await category.save();

        const response = res.status(201).json({ message: 'category successfully added', data: newCategory });

        return response;
    } catch(err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        };
        next(err);
    };
};

// View Category
exports.getViewCategory = async (req, res, next) => {
    const categoryId = req.params.categoryId;

    const existingCategory = await Category.findById({ categoryId });

    return res.status(200).json({ message: 'found', category: existingCategory });
};

// Edit Category
exports.updateCategory = async(req, res, next) => {
    const categoryId = req.params.categoryId;
    const categoryName = req.body.name;

    try {
        const existingCategory = await Category.findById({ categoryId });

        // Extra check
        if (!existingCategory) {
            const error = new Error();
            error.statusCode = 422;
            error.message = 'category doesnt exist'
        };

        existingCategory.name = categoryName;
        const updatedCategory = await existingCategory.save();

        const response = res.status(200).json({ message: 'eidt succesful', data: updatedCategory })
        return response;
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        };
        next(err);
    };
};

// Delete Category
exports.postDeleteCategory = async (req, res, next) => {
    const categoryId = req.params.prodId;

    try {
        const category = await Category.findById(categoryId);

        if (!category) {
            const error = new Error('unprocessible entity');
            error.statusCode = 422;
            error.message = 'no category found';
            throw error;
        };

        const deletedCategory = await categorys.findByIdAndRemove(category);

        res.status(200).json({
            message: 'category deleted',
            result: deletedCategory
        });
    } catch (error) {
        console.log(error);
    };
};


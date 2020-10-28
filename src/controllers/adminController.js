const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const crypto = require('crypto');

require('dotenv').config();

const Admin = require('../models/admin');

// signup Admin
exports.postSignupAdmin = async (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);

    // Parsed Fields
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

    try {
        if (!errors.isEmpty()) {
            const customError = new Error('validation error');
            customError.statusCode = 422;
            customError.data = errors.array();
            throw customError;
        };
    
        // hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        const admin = new Admin({ firstName, lastName, email, password: hashedPassword });

        const newAdmin = await admin.save();
        console.log(newAdmin, ' newAdmin')
        const response = res.status(201).json({ message: 'successful singup!', admin: newAdmin });
        
        return response;
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        };
        console.log(err)
        next(err);
    };
};


exports.postLoginAdmin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const foundAdmin = await Admin.findOne({ email });

        // existing Admin check
        if (!foundAdmin) {
            const error = new Error();
            error.message = 'email not found or registered';
            error.statusCode = 401;
            throw error;
        };

        const passwordCheck = await bcrypt.compare(password, foundAdmin.password);
        // conditional password check
        if (!passwordCheck) {
            const error = new Error();
            error.message = 'incorrect password';
            error.statusCode = 401;
            throw error;
        };

        // Generating authentication token with JWT
        const token = jwt.sign({
            adminId: foundAdmin._id.toString(),
            email: foundAdmin.email
        }, 
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
        );

        const response = res.status(200).json({ token, email: `${foundAdmin.email}`});
        return response;
    } catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        };
        next(err);
    };
};
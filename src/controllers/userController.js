const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const crypto = require('crypto');

require('dotenv').config();

const User = require('../models/user');


// generating random token
const secret = crypto.randomBytes(64).toString('hex');
// signup user
exports.postSignupUser = async (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);

    try {
        if (!errors.isEmpty()) {
            const customError = new Error('validation error');
            customError.statusCode = 422;
            customError.data = errors.array();
            throw customError;
        };

        // Parsed Fields
        const firstName = req.body.firstname;
        const lastName = req.body.lastname;
        const email = req.body.email;
        const password = req.body.password;

    
        // hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({ firstName, lastName, email, password: hashedPassword });

        const newUser = await user.save();
        console.log(newUser, ' newUser')
        const response = res.status(201).json({ message: 'successful singup!', user: newUser });
        
        return response;
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        };
        console.log(err)
        next(err);
    };
};


exports.postLoginUser = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const foundUser = await User.findOne({ email });

        // existing user check
        if (!foundUser) {
            const error = new Error();
            error.message = 'email not found or registered';
            error.statusCode = 401;
            throw error;
        };

        const passwordCheck = await bcrypt.compare(password, foundUser.password);
        // conditional password check
        if (!passwordCheck) {
            const error = new Error();
            error.message = 'incorrect password';
            error.statusCode = 401;
            throw error;
        };

        // Generating authentication token with JWT
        const token = jwt.sign({
            userId: foundUser._id.toString(),
            email: foundUser.email
        }, 
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
        );

        const response = res.status(200).json({ token, email: `${foundUser.email}`});
        return response;
    } catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        };
        next(err);
    };
};
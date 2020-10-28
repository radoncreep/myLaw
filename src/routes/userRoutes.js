const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user.js');
const { postSignupUser, postLoginUser } = require('../controllers/userController.js');

const router = express.Router();

// sign up 
router.post('/api/auth/sign-up', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom(async (value, { req }) => {
            return User.findOne({ email: value })
                .then(existingUser => {
                    console.log(existingUser, ' existing')
                    if (existingUser) {
                        return Promise.reject('already existing user')
                    }
                })
        })
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 7 })
        .isAlphanumeric(),
    body('firstname')
        .trim()
        .not()
        .isEmpty(),
    body('lastname')
        .trim()
        .not()
        .isEmpty()
    ], postSignupUser
);

// sign in 
router.post('/api/auth/login', postLoginUser)
// 

module.exports = router;
const express = require('express');
const { body } = require('express-validator');

const Admin = require('../models/admin.js');
const User = require('../models/user');
const { postSignupAdmin, postLoginAdmin } = require('../controllers/adminController.js');

const router = express.Router();

// sign up 
router.post('/api/auth/admin/sign-up', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom(async (value, { req }) => {
            return Admin.findOne({ email: value })
                .then(existingAdmin => {
                    console.log(existingAdmin, ' existing')
                    if (existingAdmin) {
                        return Promise.reject('already existing Admin')
                    }
                })
        })
        .custom(async (value, { req }) => {
            return User.findOne({ email: value })
                .then(existingAdmin => {
                    console.log(existingAdmin, ' existing')
                    if (existingAdmin) {
                        return Promise.reject("can't sign up as an admin with this email address")
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
    ], postSignupAdmin
);

// sign in 
router.post('/api/auth/admin/login', postLoginAdmin);


module.exports = router;
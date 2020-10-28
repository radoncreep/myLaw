const express = require('express');

const { postAddCategory,
        updateCategory,
        getViewCategory,
        postDeleteCategory
    } = require('../controllers/categoryCtrl');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();


// REMINDER -- CATEGORY MANAGEMENT ENDPOINTS SHOULD ONLY BE ACCESSIBLE BY ADMIN(S)

// Create Category
router.post('/api/add-category', adminAuth, postAddCategory);

router.get('/api/view-category', getViewCategory);

router.put('/api/edit-category/:categoryId', adminAuth, updateCategory);

router.delete('/api/delete-category', adminAuth, postDeleteCategory);

module.exports = router;


const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    description: { 
        type: String,
        required: true 
    },
    category: {
        type: String,
        ref: 'Category'
    }
});

module.exports = mongoose.model('Products', productSchema);
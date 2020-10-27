const mongoose = require('mongoose');

const Schema = mongoose.Schema;

constcategorySchema = new Schema(
    [{
    categoryName: {
        type: String,
        required: true
    }
}]);

module.exports = mongoose.model('Category',categorySchema);
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: String,
        required: true
    },
    productBrand: {
        type: String,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    productQuantity: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    }
});

module.exports  = mongoose.model('Products', productSchema);

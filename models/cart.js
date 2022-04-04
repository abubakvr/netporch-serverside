const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cartItemschema = new Schema({
    userID: {
        type: String,
        required: true
    },
    itemID: {
        type: String,
        required: true
    },
    cartItemName: {
        type: String,
        required: true
    },
    cartItemPrice: {
        type: String,
        required: true
    },
    itemShippingPrice: {
        type: String,
        required: true
    },
    cartItemQuantity: {
        type: String,
        required: true
    },
    cartItemImage: {
        type: String,
        required: true
    }
});

module.exports  = mongoose.model('cartItems', cartItemschema);
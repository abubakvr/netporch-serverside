const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    itemID: {
        type: String,
        required: true
    },
    itemImage: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    itemQuantity: {
        type: String,
        required: true
    },
    itemPrice: {
        type: String,
        required: true
    },
    dateOrdered: {
        type: String,
        required: true
    },
    receiverName: {
        type: String,
        required: true
    },
    receiverAddress: {
        type: String,
        required: true
    },
    receiverNo: {
        type: String,
        required: true
    },
    completed: {
        type: String,
        required: true
    }
});

module.exports  = mongoose.model('Orders', orderSchema);
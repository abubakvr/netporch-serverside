const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wishListschema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  itemID: {
    type: String,
    required: true,
  },
  wishItemName: {
    type: String,
    required: true,
  },
  wishItemPrice: {
    type: String,
    required: true,
  },
  wishItemImage: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("wishList", wishListschema);

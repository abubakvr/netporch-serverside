const wishItems = require("../models/wishlist");

class WishController {
  constructor() {}

  //Add Products --------------------------------------------
  async addToWish(data) {
    try {
      const newItem = new wishItems(data);
      const Item = await newItem.save();
      return { ok: true, Item };
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  //Get Products
  async getWishItems() {
    try {
      var mysort = { _id: -1 };
      const getItems = await wishItems.find().sort(mysort);
      return { ok: true, getItems };
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  //Get Product by category
  async getByUser(userId) {
    try {
      var mysort = { _id: -1 };
      var query = { userID: userId };
      const userItems = await wishItems.find(query).sort(mysort);
      return { ok: true, userItems };
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  //Delete Product
  async deleteManyItems(userId) {
    try {
      await wishItems.collection.deleteMany({ userID: userId });
      return { ok: true, message: "Success" };
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  //Delete Product
  async deleteWishItem(id) {
    try {
      await wishItems.findByIdAndDelete(id);
      return { ok: true, message: "Deleted Product" };
    } catch (err) {
      return { ok: false, error: err };
    }
  }
}

module.exports = new WishController();

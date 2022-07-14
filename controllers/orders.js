const Orders = require('../models/orders')

class OrdersController {
  constructor() {}

  //Add order --------------------------------------------
  async addOrder(data) {
    try {
      const order = await Orders.collection.insertMany(data);
      return { ok: true, order };
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  //Get order
  async getOrders() {
    try {
      var mysort = { _id: -1 };
      const getOrders = await Orders.find().sort(mysort);
      return { ok: true, getOrders };
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  //Get one order
  async getOrder(id) {
    try {
      const getOrder = await Orders.findById(id);
      return { ok: true, getOrder };
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  //Delete order
  async deleteOrders(id) {
    try {
      await Orders.findByIdAndDelete(id);
      return { ok: true, message: "Deleted Order" };
    } catch (err) {
      return { ok: false, error: err };
    }
  }
}

module.exports = new OrdersController();

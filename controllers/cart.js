const cartItems = require('../models/cart')

class CartController{
    constructor(){}

//Add Products --------------------------------------------
async addToCart(data){
    try {
        const newItem = new cartItems(data);
        const Item = await newItem.save();
        return {ok:true, Item};
    }catch(err){
        return {ok:false,error:err};
    }
} 

//Get Products
async getCartItems(){
    try {
      var mysort = { _id: -1 };
      const getItems = await cartItems.find().sort(mysort);
      return {ok:true, getItems};
    } catch (err) {
      return {ok:false,error:err};
    }
  }

  //Get Product by category
  async getByUser(userId){
    try {
      var mysort = { _id: -1 };
      var query = { userID: userId };
      const userItems = await cartItems.find(query).sort(mysort);
      return {ok:true, userItems};
    } catch (err) {
      return {ok:false,error:err};
    }
  }

  //Delete Product
  async deleteCartItem(id){
    try {
      await cartItems.findByIdAndDelete(id);
      return {ok:true, message: "Deleted Product" };
    } catch (err) {
      return {ok:false,error:err};
    }
  }
}

module.exports = new CartController();

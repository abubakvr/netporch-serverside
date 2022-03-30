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
      const getItems = await cartItems.find();
      return {ok:true, getItems};
    } catch (err) {
      return {ok:false,error:err};
    }
  }

  // //Get Product
  // async getCartItem(id){
  //   try {
  //     const Item = await cartItems.findById(id);
  //     return {ok:true, Item};
  //   } catch (err) {
  //     return {ok:false,error:err};
  //   }
  //}

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

const Products = require('../models/products')

class ProductController{
    constructor(){}

//Add Products --------------------------------------------
async addProduct(data, imagePath){
    try {
        data.productImage = imagePath;
        const newProduct = new Products(data);
        const Product = await newProduct.save();
        return {ok:true, Product};
    }catch(err){
        return {ok:false,error:err};
    }
} 

//Get Products
async getProducts(){
    try {
      var mysort = { _id: -1 };
      const getProducts = await Products.find().sort(mysort);
      return {ok:true, getProducts};
    } catch (err) {
      return {ok:false,error:err};
    }
  }

  //Get Product
  async getProduct(id){
    try {
      const Product = await Products.findById(id);
      return {ok:true, Product};
    } catch (err) {
      return {ok:false,error:err};
    }
  }

  //Get Product by category
  async getCategory(category){
    try {
      var query = { productCategory: category };
      const Product = await Products.find(query);
      return {ok:true, Product};
    } catch (err) {
      return {ok:false,error:err};
    }
  }

  //Get Update
  async updateProduct(id,newData){
    try {
      const updateProduct = await Products.findByIdAndUpdate(id, newData, {multi:false, new:true});
      return {ok:true, Product:updateProduct};
    } catch (err) {
      return {ok:false,error:err};
    }
  }

  //Delete Product
  async deleteProduct(id){
    try {
      await Products.findByIdAndDelete(id);
      return {ok:true, message: "Deleted Product" };
    } catch (err) {
      return {ok:false,error:err};
    }
  }
}

module.exports = new ProductController();

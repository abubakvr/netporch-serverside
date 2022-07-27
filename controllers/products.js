const Products = require('../models/products')

class ProductController {
  constructor() {}

  //Add Products --------------------------------------------
  async addProduct(data, images) {
    try {
      data.productImage = [
        { image: images[0].filename },
        { image: images[1].filename },
        { image: images[2].filename },
        { image: images[3].filename },
      ];
      const newProduct = new Products(data);
      const Product = await newProduct.save();
      return { ok: true, Product };
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  //Get Products
  async getProducts(keys) {
    try {
      var mysort = { _id: -1 };
      const getProducts = await Products.find().sort(mysort);
      return { ok: true, getProducts };
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  //Get Product
  async getProduct(id) {
    try {
      const Product = await Products.findById(id);
      return { ok: true, Product };
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  //Search Product
  async searchProduct(key) {
    try {
      const Product = await Products.find({
        $or: [
          { productName: { $regex: key } },
          { productBrand: { $regex: key } },
          { productCategory: { $regex: key } },
        ],
      });
      return { ok: true, Product };
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  async filterProducts(data) {
    try {
      const filteredProducts = await Products.find({
        $or: [
          { productName: data.name },
          { productBrand: data.brand },
          { productCategory: data.category },
        ],
      });
      return { ok: true, filteredProducts };
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  //Get Product by category
  async getCategory(category) {
    try {
      var query = { productCategory: category };
      const Product = await Products.find(query);
      return { ok: true, Product };
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  //Get Update
  async updateProduct(id, newData) {
    try {
      const updateProduct = await Products.findByIdAndUpdate(id, newData, {
        multi: false,
        new: true,
      });
      return { ok: true, Product: updateProduct };
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  //Delete Product
  async deleteProduct(id) {
    try {
      await Products.findByIdAndDelete(id);
      return { ok: true, message: "Deleted Product" };
    } catch (err) {
      return { ok: false, error: err };
    }
  }
}

module.exports = new ProductController();

const CartCtrl = require('../controllers/cart')

module.exports = (express) => {
  api = express.Router();

  //Add product
  api.post("/", async (req, res) => {
    let data = req.body;
    let status = await CartCtrl.addToCart(data);
    if (status.ok) {
      console.log("Upload Successful", status.Item);
      res.status(200).json({ message: "success" });
    } else {
      console.log("error >>>", status.error);
      res.status(500).json(status.error);
    }
  });

  //Get all products
  api.get("/", async (req, res) => {
    let status = await CartCtrl.getCartItems();
    if (status.ok) {
      if (status.getItems) return res.status(200).json(status.getItems);
      res.status(200).json([]);
    } else {
      res.status(500).json(status.error);
    }
  });

  //Get by product userID
  api.get("/user/:userid", async (req, res) => {
    let { userid } = req.params;
    let status = await CartCtrl.getByUser(userid);
    if (status.ok) {
      if (status.userItems) return res.status(200).json(status.userItems);
      res.status(200).json({});
    } else {
      res.status(500).json(status.error);
    }
  });

  //Get by product category
  api.get("/category/:category", async (req, res) => {
    let { category } = req.params;
    let status = await ProductCtrl.getCategory(category);
    if (status.ok) {
      if (status.Product) return res.status(200).json(status.Product);
      res.status(200).json({});
    } else {
      res.status(500).json(status.error);
    }
  });

  //Updating product quantity
  api.patch("/quantity/:id", async (req, res) => {
    let { id } = req.params;
    let quantity = req.body.quantity;
    let status = await CartCtrl.updateQuantity(id, quantity);
    if (status.ok) {
      res.status(200).json(status.quantity);
    } else {
      res.status(500).json(status.error);
    }
  });

  //Updating product color
  api.patch("/colour/:id", async (req, res) => {
    let { id } = req.params;
    let color = req.body.quantity;
    let status = await CartCtrl.updateColor(id, color);
    if (status.ok) {
      res.status(200).json(status.color);
    } else {
      res.status(500).json(status.error);
    }
  });

  // Deleting many product
  api.delete("/clearCart/:userId", async (req, res) => {
    let { userId } = req.params;
    let status = await CartCtrl.deleteManyItems(userId);
    if (status.ok) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(500).json(status.error);
    }
  });

  // Deleting One product
  api.delete("/:id", async (req, res) => {
    let { id } = req.params;
    let status = await CartCtrl.deleteCartItem(id);
    if (status.ok) {
      res.status(200).json(status.message);
    } else {
      res.status(500).json(status.error);
    }
  });

  return api;
};



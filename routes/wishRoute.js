const WishCtrl = require("../controllers/wishList");

module.exports = (express) => {
  api = express.Router();

  //Add product
  api.post("/", async (req, res) => {
    let data = req.body;
    let status = await WishCtrl.addToWish(data);
    if (status.ok) {
      console.log("Upload Successful", status.Item);
      res.status(200).json({ message: "success", item: status.Item });
    } else {
      console.log("error >>>", status.error);
      res.status(500).json(status.error);
    }
  });

  //Get all products
  api.get("/", async (req, res) => {
    let status = await WishCtrl.getWishItems();
    if (status.ok) {
      if (status.getItems) return res.status(200).json(status.getItems);
      res.status(200).json([]);
    } else {
      res.status(500).json(status.error);
    }
  });

  // Deleting many product
  api.delete("/clearwish/:userId", async (req, res) => {
    let { userId } = req.params;
    let status = await WishCtrl.deleteManyItems(userId);
    if (status.ok) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(500).json(status.error);
    }
  });

  // Deleting One product
  api.delete("/:id", async (req, res) => {
    let { id } = req.params;
    let status = await WishCtrl.deleteWishItem(id);
    if (status.ok) {
      res.status(200).json(status.message);
    } else {
      res.status(500).json(status.error);
    }
  });

  return api;
};

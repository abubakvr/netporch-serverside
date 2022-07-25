const uuid = require('uuid').v4;
const multer = require('multer');

const ProductCtrl = require('../controllers/products');

module.exports = (express, UPLOADS) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const fPath = UPLOADS;
      cb(null, fPath);
    },
    filename: function (req, file, cb) {
      const arr = file.originalname.split(".");
      const ext = arr[arr.length - 1];
      const fileUrl = `${uuid().replace(/-/g, "")}.${ext}`;
      req.filePath = "/uploads/" + fileUrl;
      cb(null, fileUrl);
    },
  });

  const upload = multer({ storage });
  api = express.Router();

  //Add product
  api.post("/", upload.array("productImage", 4), async (req, res) => {
    let data = JSON.parse(req.body.meta);
    let status = await ProductCtrl.addProduct(data, req.files);
    if (status.ok) {
      console.log("Upload Successful", status.Product);
      res.status(200).json({});
    } else {
      console.log("error >>>", status.error);

      res.status(500).json(status.error);
    }
  });

  //Get all products
  api.get("/", async (req, res) => {
    let status = await ProductCtrl.getProducts();
    if (status.ok) {
      if (status.getProducts) return res.status(200).json(status.getProducts);
      res.status(200).json([]);
    } else {
      res.status(500).json(status.error);
    }
  });

  //Get by product Id
  api.get("/getone/:id", async (req, res) => {
    let { id } = req.params;
    let status = await ProductCtrl.getProduct(id);
    if (status.ok) {
      if (status.Product) return res.status(200).json(status.Product);
      res.status(200).json({});
    } else {
      res.status(500).json(status.error);
    }
  });

  //Get by product Id
  api.get("/search/:key", async (req, res) => {
    let { key } = req.params;
    let status = await ProductCtrl.searchProduct(key);
    if (status.ok) {
      if (status.Product) return res.status(200).json(status.Product);
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

  //Updating product
  api.patch("/:id", async (req, res) => {
    let { id } = req.params;
    let body = req.body;
    delete body.createdAt;
    let status = await ProductCtrl.updateProduct(id, body);
    if (status.ok) {
      res.status(200).json(status.Product);
    } else {
      res.status(500).json(status.error);
    }
  });

  // Deleting One product
  api.delete("/product/:id", async (req, res) => {
    let { id } = req.params;
    let status = await ProductCtrl.deleteProduct(id);
    if (status.ok) {
      res.status(200).json(status.message);
    } else {
      res.status(500).json(status.error);
    }
  });

  return api;
};;;;;;;;;;;;;;;;;



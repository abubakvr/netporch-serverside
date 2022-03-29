const uuid = require('uuid').v4;
const multer = require('multer');

const ProductCtrl = require('../controllers/products');

module.exports = (express, UPLOADS)=>{

    const storage = multer.diskStorage({ 
      destination: function(req, file, cb){
        const fPath = UPLOADS;
        cb(null,fPath);
      },
      filename: function(req, file, cb){
        const arr = file.originalname.split('.');
        const ext = arr[arr.length-1];
        const fileUrl = `${uuid().replace(/-/g,'')}.${ext}`;
        req.filePath = '/uploads/'+fileUrl;
        cb(null,fileUrl);
      }
    });
  
    const upload = multer({storage});
    api = express.Router();

//Add product
api.post('/product', upload.single('productImage'), async(req,res)=>{
    let data = JSON.parse(req.body.meta);
    let status = await ProductCtrl.addProduct(data, req.filePath);
    if(status.ok){
        console.log("Upload Successful", status.Product);
        res.status(200).json({});
    }else{
        console.log("error >>>", status.error);
        res.status(500).json(status.error);
    }
});

//Get all products
api.get("/products", async(req,res) =>{
  let status = await ProductCtrl.getProducts();
  if(status.ok){
    if(status.getProducts) return res.status(200).json(status.getProducts);
    res.status(200).json([]);
  }else{
    res.status(500).json(status.error);
  }
});

api.get("/register", async(req,res) =>{
  res.send("Hello From backend")
});

//Get by product Id 
api.get("/product/:id", async(req,res)=>{ 
  let {id} = req.params;
  let status = await ProductCtrl.getProduct(id);
  if(status.ok){
    if(status.Product) return res.status(200).json(status.Product);
    res.status(200).json({});
  }else{
    res.status(500).json(status.error);
  }
});

//Updating product
api.patch("/product/:id", async(req,res)=>{
  let {id} = req.params;
  let body = req.body;
  delete body.createdAt;
  let status = await ProductCtrl.updateProduct(id,body)
  if(status.ok){
    res.status(200).json(status.Product);
  }else{
    res.status(500).json(status.error);
  }
});

// Deleting One product
api.delete("/product/:id", async(req,res)=>{
  let {id} = req.params;
  let status = await ProductCtrl.deleteProduct(id)
  if(status.ok){
    res.status(200).json(status.message);
  }else{
    res.status(500).json(status.error);
  }
});

//Register I
api.post("/register/"), async(req, res)=>{
  let data = JSON.parse(req.body)
  let status = await UserCtrl.addUser(data);
  if(status.ok){
      console.log("Upload Successful", status.User);
      res.status(200).json({});
  }else{
      console.log("error >>>", status.error);
      res.status(500).json(status.error);
  }
}


return api

}



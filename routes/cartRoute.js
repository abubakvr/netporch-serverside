const CartCtrl = require('../controllers/cart')

module.exports = (express)=>{

api = express.Router();

//Add product
api.post('/', async(req,res)=>{
    let data = req.body;
    let status = await CartCtrl.addToCart(data);
    if(status.ok){
        console.log("Upload Successful", status.Item,);
        res.status(200).json({});
    }else{
        console.log("error >>>", status.error);
        res.status(500).json(status.error);
    }
});

//Get all products
api.get("/", async(req,res) =>{
  let status = await CartCtrl.getCartItems();
  if(status.ok){
    if(status.getItems) return res.status(200).json(status.getItems);
    res.status(200).json([]);
  }else{
    res.status(500).json(status.error);
  }
});

//Get by product Id 
// api.get("/cart/:id", async(req,res)=>{ 
//   let {id} = req.params;
//   let status = await CartCtrl.getCartItem(id);
//   if(status.ok){
//     if(status.Product) return res.status(200).json(status.Product);
//     res.status(200).json({});
//   }else{
//     res.status(500).json(status.error);
//   }
// });

// Deleting One product
api.delete("/:id", async(req,res)=>{
  let {id} = req.params;
  let status = await CartCtrl.deleteItem(id)
  if(status.ok){
    res.status(200).json(status.message);
  }else{
    res.status(500).json(status.error);
  }
});


return api

}



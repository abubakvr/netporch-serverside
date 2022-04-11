const OrdersCtrl = require('../controllers/orders')

module.exports = (express)=>{

api = express.Router();

//Add order
api.post('/', async(req,res)=>{
    let data = req.body;
    let status = await OrdersCtrl.addOrder(data);
    if(status.ok){
        console.log("Upload Successful", status.order);
        res.status(200).json({message: "success"});
    }else{
        console.log("error >>>", status.error);
        res.status(500).json(status.error);
    }
});

//Get all orders
api.get("/", async(req,res) =>{
  let status = await OrdersCtrl.getOrders();
  if(status.ok){
    if(status.getOrders) return res.status(200).json(status.getOrders);
    res.status(200).json([]);
  }else{
    res.status(500).json(status.error);
  }
});

//Get by order userID
api.get("/:id", async(req,res)=>{ 
  let {id} = req.params;
  let status = await OrdersCtrl.getOrder(id);
  if(status.ok){
    if(status.getOrder) return res.status(200).json(status.getOrder);
    res.status(200).json({});
  }else{
    res.status(500).json(status.error);
  }
});

// Deleting One order
api.delete("/:id", async(req,res)=>{
  let {id} = req.params;
  let status = await OrdersCtrl.deleteOrders(id)
  if(status.ok){
    res.status(200).json(status.message);
  }else{
    res.status(500).json(status.error);
  }
});


return api

}



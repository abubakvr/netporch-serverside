const UserCtrl = require('../controllers/users');
const bcrypt =  require('bcrypt')
const jwt = require('jsonwebtoken')
const Users = require('../models/users')

module.exports = (express) => {

    api = express.Router();

    //Register user
    api.post("/register/", async(req, res)=>{
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(req.body.password, salt);
        let data = req.body;
        let status = await UserCtrl.addUser(data, password);
        if(status.ok){
            console.log("Upload Successful", status.User);
            res.status(200).json({message: "success"});
        }else{
            console.log("error >>>", status.error);
            res.status(500).json({message: "Unsuccessful"});
        }
    });

    //Login user
    api.post("/login/", async(req, res) => {
        const data = req.body;
        const email = data.email;
        const password = data.password;

        Users.findOne({email})
            .then(user => {
                if(!user){
                    return res.status(400).json({messasge: "User does not exist"})
                }else{
                    bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(!isMatch) {
                            return res.status(400).json({ messasge: 'Invalid credentials'});
                        }else{
                            jwt.sign({user: user}, 'secretkey', {expiresIn: '30h' }, (err, token) => {
                                res.status(200).json({
                                    user: user,
                                    token:token,
                                    message: "success"
                                })
                                console.log(token)
                                console.log(message)
                            })
                        }
                    })      
                }
            })
    })

    //Get Users
    api.get("/getusers/", async(req,res) =>{
        let status = await UserCtrl.getUsers();
        if(status.ok){
        if(status.getUsers) return res.status(200).json(status.getUsers);
        res.status(200).json([]);
        }else{
        res.status(500).json(status.error);
        }
    });



    //Delete users

    return api
}
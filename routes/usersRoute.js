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
            res.status(200).json({});
        }else{
            console.log("error >>>", status.error);
            res.status(500).json(status.error);
        }
    });

    //Login user
    api.post("/login/", async(req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        Users.findOne({email})
            .then(user => {
                if(!user){
                    return res.status(400).json({msg: "User does not exist"})
                }else{
                    bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(!isMatch) {
                            return res.status(400).json({ msg: 'Invalid credentials'});
                        }else{
                            jwt.sign({user: user}, 'secretkey', {expiresIn: '30h' }, (err, token) => {
                                res.json({
                                    user : {
                                        username: user.username
                                    },
                                    token:token
                                })
                                console.log(user)
                            })
                        }
                    })      
                }
            })
    })
    
    return api
}
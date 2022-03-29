const bcrypt = require('bcrypt');
const Users = ('../models/users.js')

const register = (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt);

    let newUser = new Users({
        email: req.body.email,
        username: req.body.username,
        password
    });

    newUser.save((err, user) => {
        if(err){
            res.json(err)
        }else{
            res.json({msg:'User added', payload: user})
        }
    });
}

module.exports = register
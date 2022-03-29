const Users = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UsersController{
    constructor(){}

//Add User --------------------------------------------
async addUser(data, password){
    try {
        data.password = password;
        const newUser = new Users(data);
        const User = await newUser.save();
        return {ok:true, User};
    }catch(err){
        return {ok:false, error:err};
    }
} 


async loginUser(email, password){
  try {
    const User = Users.findOne({email})
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
                              User : {
                                  userID: user._id,
                                  firstname: user.firstname,
                                  lastname: user.lastname
                              },
                              token:token
                          })
                      })
                  }
             })      
         }
    })
    return {ok: true, User}
  }catch(err){
    return {ok:false, error:err};
  }
}

//Get User
async getUsers(){
    try {
      const getUsers = await Users.find();
      return {ok:true, getUsers};
    } catch (err) {
      return {ok:false,error:err};
    }
  }

  //Get User
  async getUser(id){
    try {
      const User = await Users.findById(id);
      return {ok:true, User};
    } catch (err) {
      return {ok:false,error:err};
    }
  }

  //Get Update
  async updateUser(id, newData){
    try {
      const updateUser = await Users.findByIdAndUpdate(id, newData, {multi:false, new:true});
      return {ok:true, User:updateUser};
    } catch (err) {
      return {ok:false,error:err};
    }
  }

  //Delete User
  async deleteUser(id){
    try {
      await Users.findByIdAndDelete(id);
      return {ok:true, message: "Deleted Product" };
    } catch (err) {
      return {ok:false,error:err};
    }
  }
}

module.exports = new UsersController();

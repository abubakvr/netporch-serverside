const Users = require('../models/users')
const bcrypt = require('bcrypt')

class UsersController {
  constructor() {}

  //Add User --------------------------------------------
  async addUser(data, password) {
    try {
      data.password = password;
      const newUser = new Users(data);
      const User = await newUser.save();
      return { ok: true, User };
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  //Get User
  async getUsers() {
    try {
      var mysort = { _id: -1 };
      const getUsers = await Users.find().sort(mysort);
      return { ok: true, getUsers };
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  //Get User
  async getUser(id) {
    try {
      const User = await Users.findById(id);
      return { ok: true, User };
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  //Get Update
  async updateUser(id, newData) {
    try {
      const updateUser = await Users.findByIdAndUpdate(id, newData, {
        multi: false,
        new: true,
      });
      return { ok: true, User: updateUser };
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  //Delete User
  async deleteUser(id) {
    try {
      await Users.findByIdAndDelete(id);
      return { ok: true, message: "Deleted Product" };
    } catch (err) {
      return { ok: false, error: err };
    }
  }
}

module.exports = new UsersController();

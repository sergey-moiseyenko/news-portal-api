class UserController {

  constructor() {
    this.User = require('../model/user-model').User;
  }

  getUserByName(username) {
     return this.User.findOne({username: username});
  }

  isValidPassword(user, password) {
    return user.password === password;
  }

  save(user) {
    let us = new this.User(user);
    us.save();
  }
}

module.exports = new UserController();

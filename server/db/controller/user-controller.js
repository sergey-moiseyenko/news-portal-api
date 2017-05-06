class UserController {

  constructor() {
    this.User = require('../model/user-model');
  }

  getUserByName(username) {
     return this.User.findOne({username: username});
  }

  isValidPassword(user, password) {
    return user.password === password;
  }
}

module.exports = new UserController();

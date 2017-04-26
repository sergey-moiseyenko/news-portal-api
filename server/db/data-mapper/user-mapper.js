class UserMapper {

  constructor() {
    this.db = require('diskdb');
    this.connect = this.db.connect(__dirname + '/../data', ['users', 'current_user']);
  }

  getUserByName(username) {
    return this.db.users.findOne({username: username});
  }

  isValidPassword(user, password) {
    return user.password === password;
  }
}

module.exports = new UserMapper();

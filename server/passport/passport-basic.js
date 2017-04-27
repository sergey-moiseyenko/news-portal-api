const userMapper = require('../../db/data-mapper/user-mapper');
let passport = require('passport');
let Strategy = require('passport-http').BasicStrategy;

passport.use(new Strategy(
  function(username, password, done) {
    let user = userMapper.getUserByName(username);

    if (!user) return done(null, false);


    if (!userMapper.isValidPassword(user, password)) {
      return done(null, false);
    }

    return done(null, user);
  }
));

module.exports = passport;

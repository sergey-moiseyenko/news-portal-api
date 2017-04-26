let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
const userMapper = require('../db/data-mapper/user-mapper');

passport.use(new LocalStrategy(
  {passReqToCallback: true},

  (req, username, password, done) => {

    let user = userMapper.getUserByName(username);

    if (!user) return done(null, false);


    if (!userMapper.isValidPassword(user, password)) {
      return done(null, false);
    }

    return done(null, user);
  }));

module.exports = passport;

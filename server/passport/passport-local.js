let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
const userCV = require('../db/controller/user-controller');

passport.use(new LocalStrategy(
  {passReqToCallback: true},

  (req, username, password, done) => {

    userCV.getUserByName(username).exec((err, user) => {

      if (err) return done(null, false);

      if (!user) return done(null, false);

      if (!userCV.isValidPassword(user, password)) {
        return done(null, false);
      }

      return done(null, user);
    });
  }));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log('asfasfd');
  done(null, user);
});

module.exports = passport;

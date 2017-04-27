const userMapper = require('../../db/data-mapper/user-mapper');
let passport = require('passport');
let Strategy = require('passport-http').DigestStrategy;

passport.use(new Strategy({ qop: 'auth' },
  (username, done) => {
    let user = userMapper.getUserByName(username);

    if (!user) return done(null, false);

    return done(null, user, user.password);
  }
));

module.exports = passport;

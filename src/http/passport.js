const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const UserRepository = require('../repositories/UserRepository');

passport.use(
  new BearerStrategy({ session: false }, async (token, done) => {
    try {
      done(null, await UserRepository.findUserByTokenHash(token));
    } catch (err) {
      done(err, false);
    }
  }),
);

module.exports = passport;
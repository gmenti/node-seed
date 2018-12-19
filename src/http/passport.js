const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const UserRepository = require('../repositories/UserRepository');

passport.use(
  new BearerStrategy({ session: false }, async (token, done) => {
    try {
      const user = await UserRepository.findUserByTokenHash(token);
      if (!user) {
        throw new Error('invalid_token')
      }
      if (user.disabled) {
        throw new Error('disabled_user')
      }
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }),
);

module.exports = passport;
const passport = require('./passport');

const bearerAuthMiddleware = passport.authenticate('bearer', {
  session: false,
});

const adminMiddleware = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    next(new Error('invalid_permission'))
  }
};

module.exports = {
  bearerAuthMiddleware,
  adminMiddleware,
};

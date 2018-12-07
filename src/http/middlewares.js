const passport = require('./passport');

const bearerAuthMiddleware = passport.authenticate('bearer', {
  session: false,
});

const adminMiddleware = (req, res, next) => {
  if (!req.user.isAdmin) {
    res.sendStatus(401);
  }
  next();
};

module.exports = {
  bearerAuthMiddleware,
  adminMiddleware,
};

const { Router } = require('express');
const UserController = require('../controller/UserController');
const { bearerAuthMiddleware } = require('../middlewares')

module.exports = Router()
  .get('/me', bearerAuthMiddleware, (req, res) => res.send(req.user))
  .post('/', UserController.emailPasswordLogin.bind(UserController))

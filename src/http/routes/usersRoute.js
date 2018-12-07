const { Router } = require('express');
const UserController = require('../controller/UserController');

module.exports = Router()
  .get('/', UserController.index.bind(UserController))
  .get('/:id', UserController.get.bind(UserController))
  .post('/', UserController.create.bind(UserController))
  .put('/change-password', UserController.changePassword.bind(UserController))
  .put('/:id', UserController.update.bind(UserController))
  .delete('/:id', UserController.delete.bind(UserController));

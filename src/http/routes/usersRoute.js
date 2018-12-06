const { Router } = require('express');
const UserController = require('../controller/UserController');

module.exports = Router()
  .get('/', UserController.index)
  .get('/:id', UserController.get)
  .post('/', UserController.create)
  .put('/:id', UserController.update)
  .delete('/:id', UserController.delete);

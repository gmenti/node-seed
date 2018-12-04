const { Router } = require('express');
const UserController = require('../controller/UserController');

module.exports = Router().get('/', UserController.index);

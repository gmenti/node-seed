const UserRepository = require('../repositories/UserRepository');

class UserController {
  static index(req, res, next) {
    return UserRepository.all().then(users => {
      next(new Error('kkk'));
      res.send(users);
    });
  }
}

module.exports = UserController;

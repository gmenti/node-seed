const jsonwebtoken = require('jsonwebtoken');
const UserRepository = require('../../repositories/UserRepository');
const TokenRepository = require('../../repositories/TokenRepository');
const UserSchema = require('../../schemas/UserSchema');
const RestController = require('./RestController');
const { SECRET_KEY } = require('../../settings');

class UserController extends RestController {
  static get schema() {
    return UserSchema;
  }
  static get repository() {
    return UserRepository;
  }
  static get tokenRepository() {
    return TokenRepository;
  }
  /**
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Function} next
   */
  static async changePassword(req, res, next) {
    try {
      const data = await this.schema.changePassword(req.body);
      await this.repository.changePassword(data);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
  /**
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Function} next
   */
  static async emailPasswordLogin(req, res, next) {
    try {
      const data = await this.schema.emailPasswordLogin(req.body);
      const user = await this.repository.findUserByCredentials(data);

      let token = await this.tokenRepository.findByUserId(user.id);
      if (!token) {
        const hash = jsonwebtoken.sign(`${user.id}:${Date.now()}`, SECRET_KEY);

        const [id] = await this.tokenRepository.create({
          hash,
          userId: user.id,
        });

        token = await this.tokenRepository.find(id);
      }

      res.send({
        user, token
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;

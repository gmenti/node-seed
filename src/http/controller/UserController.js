const UserRepository = require('../../repositories/UserRepository');
const UserSchema = require('../../schemas/UserSchema');

class UserController {
  /**
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Function} next
   */
  static async index(req, res, next) {
    try {
      const options = await UserSchema.list(req.query);
      const users = await UserRepository.list(options);
      res.send(users);
    } catch (err) {
      next(err);
    }
  }
  /**
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Function} next
   */
  static async get(req, res, next) {
    try {
      const { id } = await UserSchema.find(req.params);
      const user = await UserRepository.find(id);
      if (user) {
        res.send(user);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      next(err);
    }
  }
  /**
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Function} next
   */
  static async create(req, res, next) {
    try {
      const data = await UserSchema.create(req.body);
      const [id] = await UserRepository.create(data);
      const user = await UserRepository.find(id);
      res.send(user);
    } catch (err) {
      next(err);
    }
  }
  /**
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Function} next
   */
  static async update(req, res, next) {
    try {
      const { id, ...data } = await UserSchema.update(req.params, req.body);
      await UserRepository.update(id, data);
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
  static async delete(req, res, next) {
    try {
      const { id } = await UserSchema.delete(req.params);
      await UserRepository.delete(id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;

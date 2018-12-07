class RestController {
  static get schema() {
    return null;
  }
  static get repository() {
    return null;
  }
  /**
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Function} next
   */
  static async index(req, res, next) {
    try {
      const options = await this.schema.list(req.query);
      const records = await this.repository.list(options);
      res.send(records);
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
      const { id } = await this.schema.find(req.params);
      const record = await this.repository.find(id);
      if (record) {
        res.send(record);
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
      const data = await this.schema.create(req.body);
      const [id] = await this.repository.create(data);
      const record = await this.repository.find(id);
      res.send(record);
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
      const { id, ...data } = await this.schema.update(req.params, req.body);
      await this.repository.update(id, data);
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
      const { id } = await this.schema.delete(req.params);
      await this.repository.delete(id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = RestController;

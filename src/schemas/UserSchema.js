const Joi = require('joi');
const Schema = require('./Schema');

class UserSchema extends Schema {
  static list(data) {
    this.castToJson(data, ['order', 'limit', 'filter']);

    const schema = Joi.object({
      order: Joi.array().ordered(
        Joi.string()
          .valid('fullName')
          .required()
          .trim(),
        Joi.string()
          .valid('ASC', 'DESC')
          .required()
          .trim()
          .uppercase(),
      ),
      limit: Joi.array().ordered(
        Joi.number()
          .integer()
          .min(0)
          .required(),
        Joi.number()
          .integer()
          .min(0)
          .required(),
      ),
      filter: Joi.object({
        fullName: Joi.string().trim(),
      }),
    }).required();

    return this.validate(schema, data);
  }

  static find(data) {
    const schema = Joi.object({
      id: Joi.number()
        .integer()
        .min(1),
    });

    return this.validate(schema, data);
  }

  static create(data) {
    const schema = Joi.object({
      fullName: Joi.string()
        .min(8)
        .required(),
      document: Joi.string()
        .length(11)
        .required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(8)
        .required(),
    });

    return this.validate(schema, data);
  }

  static update({ id }, data) {
    const schema = Joi.object({
      id: Joi.number()
        .integer()
        .min(1),
      fullName: Joi.string()
        .min(8)
        .required(),
      document: Joi.string()
        .length(11)
        .required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(8)
        .required(),
    });

    return this.validate(schema, { ...data, id });
  }

  static delete(data) {
    const schema = Joi.object({
      id: Joi.number()
        .integer()
        .min(1),
    });

    return this.validate(schema, data);
  }

  static changePassword(data) {
    const schema = Joi.object({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(8)
        .required(),
      newPassword: Joi.string()
        .min(8)
        .required()
        .disallow(Joi.ref('password')),
    });

    return this.validate(schema, data);
  }

  static emailPasswordLogin(data) {
    const schema = Joi.object({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(8)
        .required(),
    });

    return this.validate(schema, data);
  }
}

module.exports = UserSchema;

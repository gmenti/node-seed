const Joi = require('joi');

class BaseSchema {
  static castToJson(data, keys) {
    keys.forEach(key => {
      if (typeof data[key] === 'string') {
        data[key] = JSON.parse(data[key]);
      }
    });
  }
  static validate(schema, data) {
    const validation = Joi.validate(data, schema, {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: true,
    });

    if (!validation.error) {
      return validation.value;
    }

    throw validation.error;
  }
}

module.exports = BaseSchema;

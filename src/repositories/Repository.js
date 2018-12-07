const database = require('../database');

class Repository {
  static get tableName() {
    return null;
  }
  static get table() {
    return database.from(this.tableName);
  }
  static list(options) {
    const { order, limit, filter } = options;
    const query = this.all();

    if (order) {
      const [field, sort] = order;
      query.orderBy(field, sort);
    }

    if (limit) {
      const [start, end] = limit;
      query.limit(end - start).offset(start);
    }

    if (filter) {
      Object.keys(filter).forEach(key => {
        const value = filter[key];
        if (typeof value === 'string') {
          query.where(`${this.tableName}.${key}`, 'like', `%${value}%`);
        } else {
          query.where(`${this.tableName}.${key}`, value);
        }
      });
    }

    return query;
  }
  static all() {
    return this.table.select().where(`${this.tableName}.deleted`, false);
  }
  static find(id) {
    return this.all()
      .where(`${this.tableName}.id`, id)
      .first();
  }
  static create(data) {
    return this.table.insert(data);
  }
  static update(id, data) {
    return this.table
      .where(`${this.tableName}.id`, id)
      .where(`${this.tableName}.deleted`, false)
      .first()
      .update(data);
  }
  static delete(id) {
    return this.table
      .where(`${this.tableName}.id`, id)
      .where(`${this.tableName}.deleted`, false)
      .update({
        deletedAt: new Date(),
        deleted: true,
      });
  }
}

module.exports = Repository;

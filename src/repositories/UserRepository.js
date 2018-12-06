const database = require('../database');
const tableName = 'users';

class UserRepository {
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
          query.where(key, 'like', `%${value}%`);
        } else {
          query.where(key, value);
        }
      });
    }

    return query;
  }
  static all() {
    return database.select().from(tableName);
  }
  static find(id) {
    return database
      .select()
      .from(tableName)
      .where('id', id)
      .first();
  }
  static create(data) {
    return database.table(tableName).insert(data);
  }
  static update(id, data) {
    return database
      .table(tableName)
      .where('id', id)
      .first()
      .update(data);
  }
  static delete(id) {
    return database
      .table(tableName)
      .where('id', id)
      .delete();
  }
}

module.exports = UserRepository;

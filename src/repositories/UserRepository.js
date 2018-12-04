const database = require('../database');
const tableName = 'users';

class UserRepository {
  static all() {
    return database.select().from(tableName);
  }
  static insert(data) {
    return database.table(tableName).insert(data);
  }
  static updateById(id, data) {
    return database
      .table(tableName)
      .where('id', id)
      .update(data);
  }
}

module.exports = UserRepository;

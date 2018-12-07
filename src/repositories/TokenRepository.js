const Repository = require('./Repository');

class TokenRepository extends Repository {
  static get tableName() {
    return 'tokens';
  }
  static findByHash(hash) {
    return this.all()
      .where('hash', hash)
      .first();
  }
  static findByUserId(userId) {
    return this.all()
      .where('userId', userId)
      .first();
  }
}

module.exports = TokenRepository;

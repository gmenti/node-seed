const CryptoJS = require('crypto-js');
const Repository = require('./Repository');
const { SECRET_KEY } = require('../settings');

const encryptPassword = password =>
  CryptoJS.SHA512(`${password}:${SECRET_KEY}`).toString();

class UserRepository extends Repository {
  static get tableName() {
    return 'users';
  }
  static create(data) {
    const records = [];
    if (data instanceof Array) {
      data.forEach(record => {
        record.password = encryptPassword(record.password);
        records.push(record);
      });
    } else {
      records.push(data);
    }
    return super.create(data);
  }
  static findByEmail(email) {
    return this.all()
      .where(`${this.tableName}.email`, email)
      .first();
  }
  static findUserByTokenHash(tokenHash) {
    return this.all()
      .select(`${this.tableName}.*`)
      .innerJoin('tokens', 'tokens.userId', 'users.id')
      .where('tokens.hash', tokenHash)
      .where('tokens.deleted', false)
      .first()
  }
  static async changePassword({ email, password, newPassword }) {
    const user = await this.findUserByCredentials({ email, password });
    await this.update(user.id, { password: encryptPassword(newPassword) });
  }
  static async findUserByCredentials({ email, password }) {
    const user = await this.findByEmail(email);
    if (!user || user.password !== encryptPassword(password)) {
      throw new Error('invalid_credentials');
    }
    return user;
  }
}

module.exports = UserRepository;

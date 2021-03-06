const database = require('../src/database');
const UserRepository = require('../src/repositories/UserRepository');

exports.seed = async function() {
  await database.table('users').del();
  await UserRepository.create([
    {
      fullName: 'Giuseppe Menti',
      document: '03514555079',
      email: 'mentifg@gmail.com',
      password: 'menti1921',
      balance: 100,
      isAdmin: true,
    },
  ]);
};

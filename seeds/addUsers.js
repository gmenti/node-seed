const database = require('../src/database');

exports.seed = async function() {
  await database.table('users').del();
  await database.table('users').insert([
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

const faker = require('faker'); // eslint-disable-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface) => {
    const usersData = await Promise
      .all(Array(20).fill(undefined).map(async () => ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: await bcrypt.hash('Test.123', 10),
        createdAt: faker.date.past(0.5, new Date(2017, 0, 1)),
        updatedAt: faker.date.past(0.5, new Date(2018, 0, 1)),
      })));
    return queryInterface.bulkInsert('users', usersData);
  },
  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};

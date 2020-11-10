'use strict'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const faker = require('faker');
import * as enums from '../../server/models/enums';

function fill() {
  let candidates = [];
  for (let candidate = 0; candidate <= 20; candidate++) {
    candidates.push({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      country: faker.address.country(),
      email: faker.internet.email(),
      cohort: `${Math.floor(Math.random() * 7) + 1}`,
      mini_bio: faker.lorem.words(),
      status: enums.STATUS.Unemployed,
      visibility: enums.VISIBILITY.Listed,
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    });
  }
  return candidates;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('candidates', fill(), {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('candidates', null, {});
  },
};

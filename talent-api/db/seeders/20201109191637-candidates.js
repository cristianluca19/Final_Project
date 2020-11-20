'use strict';
const faker = require('faker');
// import * as enums from '../../server/models/enums';

const visibility = ['unlisted', 'listed'];

const status = ['unemployed', 'employed'];

function fill() {
  let candidates = [];
  for (let candidate = 1; candidate <= 22; candidate++){
    const randomStatus = status[Math.floor(Math.random() * status.length)];
    const randomVisbilty = visibility[Math.floor(Math.random() * visibility.length)];
    const bio = faker.lorem.paragraph().slice(0, 200);
    candidates.push({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      country: faker.address.country(),
      email: faker.internet.email(),
      cohort: `${Math.floor(Math.random() * 7) + 1}`,
      mini_bio: bio,
      profile_picture: faker.internet.avatar(),
      linkedin: faker.internet.url(),
      github: faker.internet.url(),
      status: randomStatus,
      visibility: randomVisbilty,
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    });
  }
  return candidates;
}

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('candidates', fill(), {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('candidates', null, {});
  },
};

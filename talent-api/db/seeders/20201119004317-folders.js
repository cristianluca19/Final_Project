'use strict';
const faker = require('faker');
const uuid = require('uuidv4');
function fill() {
  let folders = [];
  const status = ['created', 'sent'];
  let id = 1;
  for (let folder = 14; folder >= 1; folder--) {
    const random = faker.random.number(1);
    folders.push({
      uuid: uuid.uuid(),
      opened: faker.random.boolean(),
      status: status[random],
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
      user_id: folder,
      recruiter_id: folder,
    });
    id++;
  }
  return folders;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('folders', fill(), {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('folders', null, {});
  },
};

'use strict';
const faker = require('faker');
const uuid = require('uuidv4');
function fill() {
  const folders = [];
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
function relationCandidatesFolders() {
  const folder_candidates = [];
  let count = 0;
  for (let i = 1; i < 15; i++) {
    if (i % 5 === 0) {
      count = i;
    }
    for (let j = 1; j <= 5; j++) {
      let candidate = {
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
        candidate_id: j + count,
        folder_id: i,
      };
      folder_candidates.push(candidate);
    }
  }
  return folder_candidates;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('folders', fill(), {});
    await queryInterface.bulkInsert(
      'folder_candidates',
      relationCandidatesFolders(),
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('folders', null, {});
  },
};

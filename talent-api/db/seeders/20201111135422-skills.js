'use strict';
const faker = require('faker');

const skills = {
  hard: ['javascript', 'react', 'html5', 'nodeJs', 'express', 'sequelize'],
  soft: ['compañerismo', 'trabajo en equipo', 'liderazgo', 'flexible'],
};

function mixer(skills) {
  let skillType = ['hard', 'soft'];
  let random = skillType[Math.floor(Math.random() * 2)];
  let mix = {
    name: skills[random][Math.floor(Math.random() * (random.length - 1))],
    type: random,
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
  };
  return mix;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let count = 20;
    let skillsRandom = [];
    while (count--) {
      skillsRandom.push(mixer(skills));
    }
    await queryInterface.bulkInsert('skills', skillsRandom, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('skills', null, {});
  },
};

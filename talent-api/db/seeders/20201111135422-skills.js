'use strict';
const faker = require('faker');

const skills = {
  tech: ['javascript', 'react', 'html5', 'nodeJs', 'express', 'sequelize'],
  soft: ['compañerismo', 'trabajo en equipo', 'liderazgo', 'flexible'],
  other: ['Ruso', 'Ingles'],
};

function mixer(skills) {
  const skillType = Object.keys(skills);
  let randomSkill = skillType[Math.floor(Math.random() * (skillType.length - 1))];
  let mix = {
    name:
    skills[randomSkill][Math.floor(Math.random() * (randomSkill.length - 1))],
    type: randomSkill,
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

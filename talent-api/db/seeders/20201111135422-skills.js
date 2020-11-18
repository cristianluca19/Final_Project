'use strict';
const faker = require('faker');

const skills = {
  hard: [
    'javascript',
    'react',
    'html5',
    'nodeJs',
    'express',
    'sequelize',
    'php',
    'python',
    'flask',
    'passport',
    'java',
    'C',
    'AWS',
    'C++',
    'angular',
    'C#',
  ],
  soft: ['compañerismo', 'trabajo en equipo', 'liderazgo', 'flexible'],
};

function mixer(skills) {
  let skillType = ['hard', 'soft'];
  let randomSkill = skillType[Math.floor(Math.random() * 2)];
  let mix = {
    name:
      skills[randomSkill][Math.floor(Math.random() * (randomSkill.length - 1))],
    type: randomSkill,
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
  };
  return mix;
}
function relationCandidateSkills(skillsTable) {
  let candidate_skills = [];
  let count = 0;
  for (let i = 1; i < skillsTable.length; i++) {
    if (i % 5 === 0) {
      count = i;
    }
    for (let j = 1; j <= 5; j++) {
      let skill = {
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
        skill_id: j + count,
        candidate_id: i,
      };
      candidate_skills.push(skill);
    }
  }
  return candidate_skills;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let count = 20;
    let skillsRandom = [];
    let mixInsert;
    while (count--) {
      mixInsert = mixer(skills);
      if (!skillsRandom.includes(mixInsert)) {
        skillsRandom.push(mixInsert);
      }
    }
    await queryInterface.bulkInsert('skills', skillsRandom, {});
    await queryInterface.bulkInsert(
      'candidate_skills',
      relationCandidateSkills(skillsRandom)
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('skills', null, {});
  },
};

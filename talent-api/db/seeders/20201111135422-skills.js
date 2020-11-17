'use strict';
import { date } from 'faker';

const skills = {
  hard: ['javascript', 'react', 'html5', 'nodeJs', 'express', 'sequelize'],
  soft: ['compañerismo', 'trabajo en equipo', 'liderazgo', 'flexible'],
};

function mixer(skills) {
  let skillType = ['hard', 'soft'];
  let randomSkill = skillType[Math.floor(Math.random() * 2)];
  let mix = {
    name: skills[randomSkill][Math.floor(Math.random() * (randomSkill.length - 1))],
    type: randomSkill,
    created_at: date.past(),
    updated_at: date.recent(),
  };
  return mix;
}

export async function up(queryInterface, Sequelize) {
  let count = 20;
  let skillsRandom = [];
  while (count--) {
    skillsRandom.push(mixer(skills));
  }
  await queryInterface.bulkInsert('skills', skillsRandom, {});
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('skills', null, {});
}

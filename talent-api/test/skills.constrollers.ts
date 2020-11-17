import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
import db from '../server/models';

describe('Skills', () => {
  beforeEach(function () {
    db.Skill.destroy({ where: {} });
  });
  describe('POST create skill', () => {
    it('should create one skill', async () => {
      const newSkill = {
        name: 'Python',
      };
      const response = await request(Server)
        .post('/api/v1/skills')
        .send(newSkill);
      expect(response.body).to.have.property('name').to.be.equal('Python');
    });
  });
  describe('GET all skills', () => {
    it('Should return all existing skills', async () => {
      await db.Skill.create({ name: 'PHP' });
      await db.Skill.create({ name: 'Java' });
      await db.Skill.create({ name: 'C++' });
      const response = await request(Server).get('/api/v1/skills');
      expect(response.body).to.be.an('array').to.have.lengthOf(3);
      expect(response.body[2]).to.have.property('name').to.be.equal('C++');
    });
  });

  describe('GET specific skill', () => {
    it('should get a specific skill', async () => {
      const skillOne = await db.Skill.create({
        name: 'Go',
      });
      await db.Skill.create({ name: '.NET' });
      await db.Skill.create({ name: 'C' });
      const response = await request(Server).get(
        `/api/v1/skills/${skillOne.id}`
      );
      expect(response.body).to.have.property('name').to.be.equal('Go');
    });
  });
  describe('DELETE', () => {
    it('Should delete one skill', async () => {
      const skillOne = await db.Skill.create({ name: '.NET' });
      const skillTwo = await db.Skill.create({ name: 'C' });
      const response = await request(Server).delete(
        `/api/v1/skills/${skillTwo.id}`
      );
      expect(response.status).to.be.equal(200);
      await db.Skill.findAll();
      const responseGet = await request(Server).get('/api/skills');
      expect(responseGet.body).to.have.lengthOf(1);
    });
  });
  describe('PUT update skill', () => {
    it('should update one skill', async () => {
      const skillOne = await db.Skill.create({ name: 'Java' });
      const skillTwo = await db.Skill.create({ name: 'PHP' });
      const response = await request(Server)
        .put(`/api/v1/skills/${skillOne.id}`)
        .send({ name: 'Python' });
      expect(response.body).to.have.property('name').to.be.equal('Python');
    });
  });
});

import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
import db from '../server/models';

describe('Candidates', () => {
  beforeEach(function () {
    db.Candidate.destroy({ where: {} });
  });

  describe('GET all candidates', () => {
    it('should get all candidates', async () => {
      await db.Candidate.create({ email: 'leo@gmail.com', cohort: '4' });
      await db.Candidate.create({ email: 'mati@gmail.com', cohort: '4' });
      const response = await request(Server).get('/api/candidates');
      expect(response.body).to.have.lengthOf(2);
      expect(response.body[0])
        .to.have.property('email')
        .to.be.equal('leo@gmail.com');
      expect(response.body[1])
        .to.have.property('email')
        .to.be.equal('mati@gmail.com');
    });

    it('should be an array', async () => {
      await db.Candidate.create({ email: 'leo@gmail.com', cohort: '4' });
      await db.Candidate.create({ email: 'mati@gmail.com', cohort: '4' });
      const response = await request(Server).get('/api/candidates');
      expect(response.body).to.be.an('array');
    });
  });

  describe('GET specific candidate', () => {
    it('should get a specific candidate', async () => {
      const candidate1 = await db.Candidate.create({
        email: 'leo@gmail.com',
        cohort: '4',
      });
      await db.Candidate.create({ email: 'mati@gmail.com', cohort: '4' });
      await db.Candidate.create({ email: 'martin@gmail.com', cohort: '4' });
      const response = await request(Server).get(
        `/api/candidates/${candidate1.id}`
      );
      expect(response.body)
        .to.have.property('email')
        .to.be.equal('leo@gmail.com');
      expect(response.body).to.have.property('id').to.be.equal(candidate1.id);
    });
  });

  describe('GET filtered candidates', () => {
    it('should filter candidates by their visibility property as listed', async () => {
      await db.Candidate.create({
        email: 'leo12@gmail.com',
        cohort: '4',
        visibility: 'listed',
      });
      await db.Candidate.create({
        email: 'seba@gmail.com',
        cohort: '5',
        visibility: 'listed',
      });
      await db.Candidate.create({
        email: 'fabi@gmail.com',
        cohort: '5',
        visibility: 'unlisted',
      });
      const response = await request(Server).get(
        `/api/candidates/filterBy/listed`
      );
      expect(response.body).to.have.lengthOf(2);
      expect(response.body[0])
        .to.have.property('visibility')
        .to.be.equal('listed');
      expect(response.body[0])
        .to.have.property('email')
        .to.be.equal('leo12@gmail.com');
      expect(response.body[1])
        .to.have.property('email')
        .to.be.equal('seba@gmail.com');
    });

    it('should filter candidates by their visibility property as unlisted', async () => {
      await db.Candidate.create({
        email: 'leo12@gmail.com',
        cohort: '4',
        visibility: 'unlisted',
      });
      await db.Candidate.create({
        email: 'seba@gmail.com',
        cohort: '5',
        visibility: 'unlisted',
      });
      await db.Candidate.create({
        email: 'fabi@gmail.com',
        cohort: '5',
        visibility: 'listed',
      });
      const response = await request(Server).get(
        `/api/candidates/filterBy/unlisted`
      );
      expect(response.body).to.have.lengthOf(2);
      expect(response.body[0])
        .to.have.property('visibility')
        .to.be.equal('unlisted');
      expect(response.body[0])
        .to.have.property('email')
        .to.be.equal('leo12@gmail.com');
      expect(response.body[1])
        .to.have.property('email')
        .to.be.equal('seba@gmail.com');
    });
  });

  describe('GET search candidates by specific props', () => {
    it('should bring all candidates with a specific "cohort" property', async () => {
      const candidate = await db.Candidate.create({
        firstName: 'Leonardo',
        lastName: 'Sbaraglia',
        email: 'leosbar@gmail.com',
        cohort: '4',
      });
      await db.Candidate.create({
        firstName: 'Luke',
        lastName: 'Skywalker',
        email: 'lastjedi@gmail.com',
        cohort: '4',
      });
      await db.Candidate.create({
        firstName: 'Indian',
        lastName: 'Jones',
        email: 'indijones@gmail.com',
        cohort: '5',
      });
      const response = await request(Server).get(
        `/api/candidates/search?cohort=4`
      );
      expect(response.body).to.have.lengthOf(2);
      expect(response.body[0]).to.have.property('cohort').to.be.equal('4');
      expect(response.body[0])
        .to.have.property('email')
        .to.be.equal('leosbar@gmail.com');
      expect(response.body[1])
        .to.have.property('email')
        .to.be.equal('lastjedi@gmail.com');
    });

    it('should filter an specific candidate by his "firstName" property', async () => {
      const candidate = await db.Candidate.create({
        firstName: 'Leonardo',
        lastName: 'Sbaraglia',
        email: 'leosbar@gmail.com',
        cohort: '4',
      });
      await db.Candidate.create({
        firstName: 'Luke',
        lastName: 'Skywalker',
        email: 'lastjedi@gmail.com',
        cohort: '4',
      });
      await db.Candidate.create({
        firstName: 'Indian',
        lastName: 'Jones',
        email: 'indijones@gmail.com',
        cohort: '5',
      });
      const response = await request(Server).get(
        `/api/candidates/search?firstName=Leonardo`
      );
      expect(response.body).to.have.lengthOf(1);
      expect(response.body[0])
        .to.have.property('firstName')
        .to.be.equal('Leonardo');
    });

    it('should filter an specific candidate by his "lastName" property', async () => {
      const candidate = await db.Candidate.create({
        firstName: 'Leonardo',
        lastName: 'Sbaraglia',
        email: 'leosbar@gmail.com',
        cohort: '4',
      });
      await db.Candidate.create({
        firstName: 'Luke',
        lastName: 'Skywalker',
        email: 'lastjedi@gmail.com',
        cohort: '4',
      });
      await db.Candidate.create({
        firstName: 'Indian',
        lastName: 'Jones',
        email: 'indijones@gmail.com',
        cohort: '5',
      });
      const response = await request(Server).get(
        `/api/candidates/search?lastName=Skywalker`
      );
      expect(response.body).to.have.lengthOf(1);
      expect(response.body[0])
        .to.have.property('lastName')
        .to.be.equal('Skywalker');
    });

    it('should filter an specific candidate by his "email" property', async () => {
      const candidate = await db.Candidate.create({
        firstName: 'Leonardo',
        lastName: 'Sbaraglia',
        email: 'leosbar@gmail.com',
        cohort: '4',
      });
      await db.Candidate.create({
        firstName: 'Luke',
        lastName: 'Skywalker',
        email: 'lastjedi@gmail.com',
        cohort: '4',
      });
      await db.Candidate.create({
        firstName: 'Indian',
        lastName: 'Jones',
        email: 'indijones@gmail.com',
        cohort: '5',
      });
      const response = await request(Server).get(
        `/api/candidates/search?email=indijones@gmail.com`
      );
      expect(response.body).to.have.lengthOf(1);
      expect(response.body[0])
        .to.have.property('email')
        .to.be.equal('indijones@gmail.com');
    });
  });

  describe('PUT update visibility', () => {
    it('should update the visibility of the candidate to "listed"', async () => {
      const candidate1 = await db.Candidate.create({
        email: 'leo12@gmail.com',
        cohort: '4',
      });
      await db.Candidate.create({ email: 'mati12@gmail.com', cohort: '4' });
      const response = await request(Server)
        .put(`/api/candidates/${candidate1.id}/visibility`)
        .send({ visibility: 'listed' });
      expect(response.body)
        .to.have.property('visibility')
        .to.be.equal('listed');
    });

    it('should update the visibility of the candidate to "unlisted"', async () => {
      const candidate1 = await db.Candidate.create({
        email: 'leo15@gmail.com',
        cohort: '4',
      });
      await db.Candidate.create({ email: 'mati15@gmail.com', cohort: '4' });
      const response = await request(Server)
        .put(`/api/candidates/${candidate1.id}/visibility`)
        .send({ visibility: 'unlisted' });
      expect(response.body)
        .to.have.property('visibility')
        .to.be.equal('unlisted');
    });

    it('should update the visibility of the candidate to "private"', async () => {
      const candidate1 = await db.Candidate.create({
        email: 'leo16@gmail.com',
        cohort: '4',
      });
      await db.Candidate.create({ email: 'mati16@gmail.com', cohort: '4' });
      const response = await request(Server)
        .put(`/api/candidates/${candidate1.id}/visibility`)
        .send({ visibility: 'private' });
      expect(response.body)
        .to.have.property('visibility')
        .to.be.equal('private');
    });

    it('response should have same id as the one sent in params', async () => {
      const candidate1 = await db.Candidate.create({
        email: 'leo10@gmail.com',
        cohort: '4',
      });
      await db.Candidate.create({ email: 'mati10@gmail.com', cohort: '4' });
      const response = await request(Server)
        .put(`/api/candidates/${candidate1.id}/visibility`)
        .send({ visibility: 'listed' });
      expect(response.body).to.have.property('id').to.be.equal(candidate1.id);
    });
  });
  describe('POST add candidate to folder', () => {
    it('should add a candidate to a specific folder', async () => {
      const candidate1 = await db.Candidate.create({
        email: 'leo@gmail.com',
        cohort: '4',
      });
      await db.Candidate.create({ email: 'mati10@gmail.com', cohort: '4' });
      const folder1 = await db.Folder.create();
      await db.Folder.create();
      const response = await request(Server).post(
        `/api/candidates/${folder1.id}/addCandidate/${candidate1.id}`
      );
      expect(response.body[0])
        .to.have.property('folderId')
        .to.be.equal(folder1.id);
      expect(response.body[0])
        .to.have.property('candidateId')
        .to.be.equal(candidate1.id);
    });
  });

  describe('DELETE candidate from folder', () => {
    it('should delete a candidate from a specific folder', async () => {
      const candidate1 = await db.Candidate.create({
        email: 'leo@gmail.com',
        cohort: '4',
      });
      await db.Candidate.create({ email: 'mati10@gmail.com', cohort: '4' });
      const folder1 = await db.Folder.create();
      await db.Folder.create();
      await folder1.addCandidate(candidate1);
      const relationCreated = await db.Folder.findOne({
        where: {
          id: folder1.id,
        },
        include: db.Candidate,
      });
      await request(Server).delete(
        `/api/candidates/${folder1.id}/removeCandidate/${candidate1.id}`
      );
      const relationDeleted = await db.Folder.findOne({
        where: {
          id: folder1.id,
        },
        include: db.Candidate,
      });
      expect(relationDeleted.dataValues.id).to.be.equal(
        relationCreated.dataValues.id
      );
      expect(relationCreated.dataValues.candidates[0].dataValues)
        .to.have.property('id')
        .to.be.equal(candidate1.id);
      expect(relationDeleted.dataValues.candidates).to.have.lengthOf(0);
    });
  });
});

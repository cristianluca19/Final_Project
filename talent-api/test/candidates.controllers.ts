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

  describe('PUT update visibility', () => {
    it('should update the visibility of the candidate to "listed"', async () => {
      const candidate1 = await db.Candidate.create({
        email: 'leo12@gmail.com',
        cohort: '4',
      });
      await db.Candidate.create({ email: 'mati12@gmail.com', cohort: '4' });
      const response = await request(Server)
        .put(`/api/candidates/visibility/${candidate1.id}`)
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
        .put(`/api/candidates/visibility/${candidate1.id}`)
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
        .put(`/api/candidates/visibility/${candidate1.id}`)
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
        .put(`/api/candidates/visibility/${candidate1.id}`)
        .send({ visibility: 'listed' });
      expect(response.body).to.have.property('id').to.be.equal(candidate1.id);
    });
  });
  describe('POST create relation between candidate and folder', () => {
    it('should create an instance in the "folder_candidates" table', async () => {
      const candidate1 = await db.Candidate.create({
        email: 'leo@gmail.com',
        cohort: '4',
      });
      await db.Candidate.create({ email: 'mati10@gmail.com', cohort: '4' });
      const folder1 = await db.Folder.create();
      await db.Folder.create();
      const response = await request(Server).post(
        `/api/candidates/addToFolder/${candidate1.id}/${folder1.id}`
      );
      expect(response.body[0])
        .to.have.property('folderId')
        .to.be.equal(folder1.id);
      expect(response.body[0])
        .to.have.property('candidateId')
        .to.be.equal(candidate1.id);
    });
  });

  describe('DELETE relation between candidate and folder', () => {
    it('should delete an instance from the "folder_candidates" table', async () => {
      const candidate1 = await db.Candidate.create({
        email: 'leo@gmail.com',
        cohort: '4',
      });
      await db.Candidate.create({ email: 'mati10@gmail.com', cohort: '4' });
      const folder1 = await db.Folder.create();
      await db.Folder.create();
      await folder1.addCandidate(candidate1);
      const relation = await db.Folder.findOne({
        where: {
          id: folder1.id,
        },
        include: db.Candidate,
      });
      await request(Server).delete(
        `/api/candidates/removeFromFolder/${candidate1.id}/${folder1.id}`
      );
      const response = await db.Folder.findOne({
        where: {
          id: folder1.id,
        },
        include: db.Candidate,
      });
      expect(response.dataValues.id).to.be.equal(relation.dataValues.id);
      expect(relation.dataValues.candidates[0].dataValues)
        .to.have.property('id')
        .to.be.equal(candidate1.id);
      expect(response.dataValues.candidates).to.have.lengthOf(0);
    });
  });
});

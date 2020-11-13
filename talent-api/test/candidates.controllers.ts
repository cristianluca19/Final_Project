import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
import db from '../server/models';
import { response } from 'express';

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

  describe('DELETE candidate', ()=>{
    it('should delete a candidate by id', async () => {
      const candidate1 = await db.Candidate.create({
        email: 'cristianL@gmail.com',
        cohort: '5',
    });
    const response = await request(Server).delete(`/api/candidates/${candidate1.id}/delete`)
    const candidate = await db.Candidate.findOne({where: {email: 'cristianL@gmail.com', cohort: '5'}})
    expect(response.status).to.be.equal(204)
    expect(candidate).to.be.equal(null)
    });
  });
  
  describe('POST candidate',()=>{
    it('should create a new candidate', async ()=>{
      const response =  await request(Server).post(
        '/api/candidates/addCandidate')
      .send({
          email: 'cristianL@gmail.com',
          cohort: '5',
        });
      expect (response.status).to.be.equal(200)
    })
  })
})



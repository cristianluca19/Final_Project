import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
import db from '../server/models';
import { response } from 'express';
import path from 'path';
import { getMaxListeners } from 'process';
import { response } from 'express';

describe('Candidates', () => {
  beforeEach(function () {
    db.Candidate.destroy({ where: {} });
  });

  describe('GET all candidates', () => {
    it('should get all candidates', async () => {
      await db.Candidate.create({ email: 'leo@gmail.com', cohort: '4' });
      await db.Candidate.create({ email: 'mati@gmail.com', cohort: '4' });
      const response = await request(Server).get('/api/v1/candidates');
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
      const response = await request(Server).get('/api/v1/candidates');
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
        `/api/v1/candidates/${candidate1.id}`
      );
      expect(response.body)
        .to.have.property('email')
        .to.be.equal('leo@gmail.com');
      expect(response.body).to.have.property('id').to.be.equal(candidate1.id);
    });
  });

  describe('POST route transform csv file to json', () => {
    it('should transform all candidates correctly', async () => {
      const csvFile = path.join(__dirname + '/test_files/csvFileExample.csv');
      const response = await request(Server)
        .post(`/api/v1/candidates/csv`)
        .set('Content-Type', 'multipart/form-data')
        .attach('file', csvFile);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf(4);
      expect(response.body[1])
        .to.have.property('email')
        .to.be.equal('bryan@gmail.com');
      expect(response.body[1]).to.have.property('cohort').to.be.equal('wft-04');
    });
  });

  describe('POST route bulk candidates to database', () => {
    it('should create all candidates correctly', async () => {
      const candidates = [
        {
          email: 'leo@gmail.com',
          cohort: 'wft-05',
        },
        {
          email: 'mati@gmail.com',
          cohort: 'wft-05',
        },
        {
          email: 'bryan@gmail.com',
          cohort: 'wft-04',
        },
      ];
      const response = await request(Server)
        .post(`/api/v1/candidates`)
        .send(candidates);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf(3);
      expect(response.body[1])
        .to.have.property('email')
        .to.be.equal('mati@gmail.com');
      expect(response.body[1]).to.have.property('cohort').to.be.equal('wft-05');
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
        `/api/v1/candidates/filterBy/listed`
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
        `/api/v1/candidates/filterBy/unlisted`
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
    it('should filter all candidates that match the query "firstName" property', async () => {
      const candidate = await db.Candidate.create({
        firstName: 'Leonardo',
        lastName: 'Sbaraglia',
        email: 'leosbar@gmail.com',
        cohort: '4',
      });
      await db.Candidate.create({
        firstName: 'Leo',
        lastName: 'Messi',
        email: 'mesidiez@gmail.com',
        cohort: '4',
      });
      await db.Candidate.create({
        firstName: 'Leonidas',
        lastName: 'Spartano',
        email: 'threehundred@gmail.com',
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
      const response = await request(Server)
        .get(`/api/v1/candidates/search`)
        .query({ search: 'eo' });
      expect(response.body).to.have.lengthOf(3);
      expect(response.body[0])
        .to.have.property('firstName')
        .to.be.equal('Leonardo');
      expect(response.body[1]).to.have.property('firstName').to.be.equal('Leo');
      expect(response.body[2])
        .to.have.property('firstName')
        .to.be.equal('Leonidas');
    });

    it('should filter all candidates that match the query "lastName" property', async () => {
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
        firstName: 'Leah',
        lastName: 'Sky',
        email: 'princessleah@gmail.com',
        cohort: '4',
      });
      await db.Candidate.create({
        firstName: 'Indian',
        lastName: 'Jones',
        email: 'indijones@gmail.com',
        cohort: '5',
      });
      const response = await request(Server)
        .get(`/api/v1/candidates/search`)
        .query({ search: 'ky' });
      expect(response.body).to.have.lengthOf(2);
      expect(response.body[0])
        .to.have.property('lastName')
        .to.be.equal('Skywalker');
      expect(response.body[1]).to.have.property('lastName').to.be.equal('Sky');
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
      const response = await request(Server)
        .get(`/api/v1/candidates/search`)
        .query({ search: 'indijo' });
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
        .put(`/api/v1/candidates/${candidate1.id}/visibility`)
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
        .put(`/api/v1/candidates/${candidate1.id}/visibility`)
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
        .put(`/api/v1/candidates/${candidate1.id}/visibility`)
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
        .put(`/api/v1/candidates/${candidate1.id}/visibility`)
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
        `/api/v1/candidates/${folder1.id}/addCandidate/${candidate1.id}`
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
        `/api/v1/candidates/${folder1.id}/removeCandidate/${candidate1.id}`
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

  
  describe('POST candidate', () => {
    it('should create a new candidate', async () => {
      const candidateTest={ email: 'cristianL@gmail.com', cohort: '5',}
      const response = await request(Server)
      .post('/api/v1/candidates/addCandidate')
      .send(candidateTest);
      console.log('response', response.status)
      expect(response.status).to.be.equal(200);
      expect(response.body[0].email).to.be.equal('cristianL@gmail.com');
      expect(response.body[0].cohort).to.be.equal('5');


  describe('PUT update candidate', () => {
    it('should update one candidate', async () => {
      const candidates = [
        {
          firstName: 'Matias',
          email: 'matifu@gmail.com',
          cohort: 'wft-07',
        },
        {
          firstName: 'Diego',
          email: 'diego@gmail.com',
          cohort: 'wft-05',
        },
        {
          firstName: 'Cristian',
          email: 'cristian@gmail.com',
          cohort: 'wft-04',
        },
      ];
      const candidatesList = await db.Candidate.bulkCreate(candidates);
      const response = await request(Server)
        .put(`/api/v1/candidates/${candidatesList[1].dataValues.id}/update`)
        .send({
          firstName: 'Dieguito',
          email: 'DiegoSoyHenry@gmail.com',
          cohort: 'wft-04',
        });
      const candidateUpdated = await db.Candidate.findByPk(
        candidatesList[1].dataValues.id
      );
      expect(candidateUpdated)
        .to.have.property('email')
        .to.be.equal('DiegoSoyHenry@gmail.com');

    });
  });

  describe('DELETE candidate', () => {
    it('should delete a candidate by id', async () => {
      const candidate1 = await db.Candidate.create({
        email: 'cristianL@gmail.com',
        cohort: '5',
      });
      const response = await request(Server).delete(
        `/api/v1/candidates/${candidate1.id}/delete`
      );
      const candidate = await db.Candidate.findOne({
        where: { email: 'cristianL@gmail.com', cohort: '5' },
      });

      expect(response.status).to.be.equal(200);
      expect(candidate).to.be.equal(null);
    });
  });
  

      expect(response.status).to.be.equal(204);
      expect(candidate).to.be.equal(null);
    });
  });

  describe('POST candidate', () => {
    it('should create a new candidate', async () => {
      const response = await request(Server)
        .post('/api/v1/candidates/addCandidate')
        .send({
          email: 'cristianL@gmail.com',
          cohort: '5',
        });
      expect(response.status).to.be.equal(200);
    });
  });
});

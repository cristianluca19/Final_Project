import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
import db from '../server/models';
import uuid from 'uuidv4';

describe('Folders', () => {
  beforeEach(function () {
    db.Folder.destroy({ where: {} });
  });
  describe('POST one folder', () => {
    it('should post one folder', async () => {
      const response = await request(Server).post('/api/v1/folders');
      expect(response.body.folder).to.have.property('uuid');
    });
  });
  describe('GET', () => {
    it('Should retrieve all existing folders', async () => {
      await db.Folder.bulkCreate([{ uuid }, { uuid }, { uuid }, { uuid }]);
      const response = await request(Server).get('/api/v1/folders');
      expect(response.body).to.be.an('array').to.have.lengthOf(4);
    });
    it('Should retrieve an specific folder with all associated candidates', async () => {
      const foldersCreated = await db.Folder.bulkCreate([{ uuid }, { uuid }]);
      const candidate = await db.Candidate.create({
        email: 'taniamg@gmail.com',
        cohort: 6,
      });
      await request(Server).post(
        `/api/v1/candidates/${foldersCreated[0].id}/addCandidate/${candidate.id}`
      );
      const response = await request(Server).get(
        `/api/v1/folders/${foldersCreated[0].id}`
      );
      expect(response.body)
        .to.be.an('object')
        .to.deep.include({ id: foldersCreated[0].id });
      expect(response.body).to.have.property('candidates').to.be.an('array');
      expect(response.body).to.have.nested.property('candidates[0].id');
      expect(response.body).to.nested.include({
        'candidates[0].email': 'taniamg@gmail.com',
      });
    });
  });
  describe('DELETE', () => {
    it('Should delete one folder', async () => {
      const folder = await db.Folder.create({ uuid });
      const response = await request(Server).delete(
        `/api/v1/folders/${folder.id}`
      );
      expect(response.status).to.be.equal(204);
      const foundFolder = await db.Folder.findByPk(folder.id);
      expect(foundFolder).to.be.null;
    });
  });
  describe('PUT', () => {
    it('Should update an specific folder dinamically', async () => {
      const folders = await db.Folder.bulkCreate([
        { uuid },
        { uuid },
        { uuid },
      ]);
      const recruiter = await request(Server).post(`/api/v1/recruiters`).send({
        contactName: 'Victor Alarcon',
        email: 'valarcon@gmail.com',
        company: 'Globant',
        siteUrl: 'www.globant.com',
      });
      const user = await request(Server).post(`/api/v1/users`).send({
        firstName: 'Lucas',
        lastName: 'Verdiell',
        profilePicture: 'https://www.test.com/lalala.png',
        role: 'selector',
      });
      const response = await request(Server)
        .put(
          `/api/v1/folders/${folders[0].id}?recruiterId=${recruiter.body['id']}`
        )
        .send({ status: 'sent' });
      expect(response.status).to.be.equal(200);
      const foundFolder = await db.Folder.findByPk(folders[0].id);
      expect(foundFolder)
        .to.be.an('object')
        .to.deep.include({ status: 'sent', recruiterId: recruiter.body['id'] });
      const responseTwo = await request(Server)
        .put(
          `/api/v1/folders/${folders[1].id}?userId=${user.body['id']}&recruiterId=${recruiter.body['id']}`
        )
        .send({ opened: true, status: 'sent' });
      expect(responseTwo.status).to.be.equal(200);
      const foundFolderTwo = await db.Folder.findByPk(folders[1].id);
      expect(foundFolderTwo).to.be.an('object').to.include({
        opened: true,
        status: 'sent',
        userId: user.body['id'],
        recruiterId: recruiter.body['id'],
      });
      const responseThree = await request(Server).put(
        `/api/v1/folders/${folders[2].id}?recruiterId=${recruiter.body['id']}&userId=${user.body['id']}`
      );
      // .send({}); // TODO: fix this...
      expect(responseThree.status).to.be.equal(200);
      const foundFolderThree = await db.Folder.findByPk(folders[2].id);
      expect(foundFolderThree).to.be.an('object').to.include({
        userId: user.body['id'],
        recruiterId: recruiter.body['id'],
      });
    });
  });
});

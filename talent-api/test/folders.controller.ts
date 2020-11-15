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
    it('Should update an specific folder', async () => {
      const folders = await db.Folder.bulkCreate([{ uuid }, { uuid }]);
      const response = await request(Server)
        .put(`/api/v1/folders/${folders[0].id}`)
        .send({ status: 'sent' });
      expect(response.status).to.be.equal(200);
      const foundFolder = await db.Folder.findByPk(folders[0].id);
      expect(foundFolder)
        .to.be.an('object')
        .to.deep.include({ status: 'sent' });
      const responseTwo = await request(Server)
        .put(`/api/v1/folders/${folders[1].id}`)
        .send({ opened: true, status: 'sent' });
      expect(responseTwo.status).to.be.equal(200);
      const foundFolderTwo = await db.Folder.findByPk(folders[1].id);
      expect(foundFolderTwo)
        .to.be.an('object')
        .to.include({ opened: true, status: 'sent' });
    });
  });
});

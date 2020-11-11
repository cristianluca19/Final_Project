import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
import db from '../server/models';

describe('Folders', () => {
  beforeEach(function () {
    db.Folder.destroy({ where: {} });
  });

  describe('POST one folder', () => {
    it('should post one folder', async () => {
      const response = await request(Server).post('/api/folders');
      expect(response.body).to.be.an('object');
      expect(response.body.folder).to.be.an('object');
      expect(response.body.folder).to.have.property('uuid');
    });
  });
});

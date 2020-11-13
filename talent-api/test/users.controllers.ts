import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
import db from '../server/models';

describe('Users', () => {
  beforeEach(function () {
    db.User.destroy({ where: {} });
  });

  describe('Create one user', () => {
    const obj = {
      firstName: 'Federico',
      lastName: 'Calderon',
      profilePicture:
        'https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg',
      role: 'admin',
    };
    it('should create one user', async () => {
      const response = await request(Server).post('/api/users').send(obj);
      const dbCreated = await db.User.findOne({
        where: { id: response.body['CREATED: '].id },
      });
      expect(dbCreated.dataValues).to.have.property;
    });
    it('should create correctly properties', async () => {
      const response = await request(Server).post('/api/users').send(obj);
      const dbCreated = await db.User.findOne({
        where: { id: response.body['CREATED: '].id },
      });
      expect(dbCreated.dataValues.firstName).to.be.equal('Federico');
      expect(dbCreated.dataValues.lastName).to.be.equal('Calderon');
      expect(dbCreated.dataValues.profilePicture).to.be.an('string');
      expect(dbCreated.dataValues.role).to.be.equal('admin');
    });
  });
});

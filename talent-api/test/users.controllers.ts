import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
import db from '../server/models';

describe('Users', () => {
  beforeEach(function () {
    db.User.destroy({ where: {} });
  });

  describe('POST one user', () => {
    const obj = {
      firstName: 'Federico',
      lastName: 'Calderon',
      profilePicture:
        'https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg',
      role: 'admin',
    };
    it('should post one user', async () => {
      const response = await request(Server).post('/api/users').send(obj);
      expect(response.body['CREATED: ']).to.be.an('object');
    });
    it('should post correctly first name', async () => {
      const response = await request(Server).post('/api/users').send(obj);
      expect(response.body['CREATED: '].firstName)
        .to.be.equal('Federico')
        .to.be.an('string');
    });
    it('should post correctly last name', async () => {
      const response = await request(Server).post('/api/users').send(obj);
      expect(response.body['CREATED: '].lastName)
        .to.be.equal('Calderon')
        .to.be.an('string');
    });
    it('should post correctly profile picture', async () => {
      const response = await request(Server).post('/api/users').send(obj);
      expect(response.body['CREATED: '].profilePicture)
        .to.be.equal(
          'https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg'
        )
        .to.be.an('string');
    });
    it('should post correctly role', async () => {
      const response = await request(Server).post('/api/users').send(obj);
      expect(response.body['CREATED: '].role)
        .to.be.equal('admin' || 'creator' || 'selector')
        .to.be.an('string');
    });
  });
});

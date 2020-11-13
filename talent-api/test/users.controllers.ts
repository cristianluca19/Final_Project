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
    const federico = {
      firstName: 'Federico',
      lastName: 'Calderon',
      profilePicture:
        'https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg',
      role: 'admin',
    };
    const carlos = {
      firstName: 'Carlos',
      lastName: 'Martin',
      profilePicture:
        'https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg',
      role: 'selector',
    };

    it('should create users', async () => {
      await request(Server).post('/api/users').send(federico);

      let allUsersInDataBase = await db.User.findAll();
      expect(allUsersInDataBase).to.have.lengthOf(1);

      await request(Server).post('/api/users').send(carlos);

      allUsersInDataBase = await db.User.findAll();
      expect(allUsersInDataBase).to.have.lengthOf(2);

      console.log(allUsersInDataBase);
    });

    it('should create correctly properties', async () => {
      const responseFederico = await request(Server)
        .post('/api/users')
        .send(federico);
      const dbCreated = await db.User.findOne({
        where: { id: responseFederico.body['CREATED: '].id },
      });
      expect(dbCreated.dataValues.firstName).to.be.equal('Federico');
      expect(dbCreated.dataValues.lastName).to.be.equal('Calderon');
      expect(dbCreated.dataValues.profilePicture).to.be.an('string');
      expect(dbCreated.dataValues.role).to.be.equal('admin');
    });
  });
});

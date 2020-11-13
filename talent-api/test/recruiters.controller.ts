import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
import db from '../server/models';
import l from '../server/common/logger';

describe('Recruiters', () => {
  beforeEach(function () {
    db.Recruiter.destroy({ where: {} });
  });

  describe('POST Recruiters', () => {
    it('Should add a new Recruiter to the DB', async () => {
      const newRecruiter = {
        contactName: 'Luis',
        email: 'luis@google.com',
        company: 'Google',
        siteUrl: 'www.google.com',
      };
      const response = await request(Server)
        .post('/api/recruiters')
        .send(newRecruiter);
      expect(response.body)
        .to.be.an('object')
        .to.have.property('email', 'luis@google.com');
    });
  });

  describe('GET Recruiters', () => {
    it('Should return a list with all recruiters', async () => {
      const newRecruiter = await db.Recruiter.bulkCreate([
        {
          contactName: 'Victor Alarcon',
          email: 'valarcon@gmail.com',
          company: 'Globant',
          siteUrl: 'www.globant.com',
        },
        {
          contactName: 'Lionel Messi',
          email: 'Liomessi@barcelona.es',
          company: 'BarcelonaFC',
          siteUrl: 'www.BarcelonaFC.com',
        },
      ]);
      const response = await request(Server).get('/api/recruiters');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.lengthOf(2);
    });

    describe('DELETE Recruiters', () => {
      it('Should delete an specific recruiter', async () => {
        const newRecruiter = await db.Recruiter.create({
          contactName: 'Victor Alarcon',
          email: 'valarcon@gmail.com',
          company: 'Globant',
          siteUrl: 'www.globant.com',
        });

        const response = await request(Server).delete(
          `/api/recruiters/${newRecruiter.id}`
        );
        expect(response.status).to.be.equal(204);
        const foundRecruiter = await db.Recruiter.findOne({
          where: { id: newRecruiter.id },
        });
        expect(foundRecruiter).to.equal(null);
      });
    });
  });
});
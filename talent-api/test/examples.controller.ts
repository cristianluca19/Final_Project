import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
import db from '../server/models';

describe('Candidates', () => {

  beforeEach(function() {
    db.Candidate.destroy({where:{}});
  });

  it('should get all candidates', async () => {
    await db.Candidate.create({ email: 'leo@gmail.com', cohort: '4' });
    await db.Candidate.create({ email: 'mati@gmail.com', cohort: '4' });
    const response = await request(Server)
      .get('/api/candidates')
    expect(response.body).to.have.lengthOf(2);
    expect(response.body).to.be.an('array');
    expect(response.body[0]).to.have.property('email').to.be.equal('leo@gmail.com');
  });

  // it('should get all candidates', async () => {
  //   await db.Candidate.create({ email: 'leo1@gmail.com', cohort: '4' });
  //   await db.Candidate.create({ email: 'mati2@gmail.com', cohort: '4' });
  //   const response = await request(Server)
  //     .get('/candidate')
  //       console.log(response.body, "aaaa")
  //       expect(response.body).to.have.lengthOf(2);
  //       expect(response.body).to.be.an('array');
  //       expect(response.body[1]).to.have.property('id').to.be.equal(2);
  // });

  //aca va el :id

  // it('should get all examples', () =>
  //   request(Server)
  //     .get('/api/v1/examples')
  //     .expect('Content-Type', /json/)
  //     .then((resp) => {
  //       expect(resp.body).to.be.an('array').of.length(2);
  //     }));

  // it('should add a new example', () =>
  //   request(Server)
  //     .post('/api/v1/examples')
  //     .send({ name: 'test' })
  //     .expect('Content-Type', /json/)
  //     .then((resp) => {
  //       expect(resp.body)
  //         .to.be.an('object')
  //         .that.has.property('name')
  //         .equal('test');
  //     }));

  // it('should get an example by id', () =>
  //   request(Server)
  //     .get('/api/v1/examples/2')
  //     .expect('Content-Type', /json/)
  //     .then((resp) => {
  //       expect(resp.body)
  //         .to.be.an('object')
  //         .that.has.property('name')
  //         .equal('test');
  //     }));
});


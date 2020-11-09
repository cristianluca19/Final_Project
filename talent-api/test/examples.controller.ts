import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
import db from '../server/models';

describe('Examples', () => {
  it('should get all candidates', async () => {
    await db.Candidate.create({ email: 'leo41@gmail.com', cohort: '4' });
    request(Server)
      .get('/candidate')
      .then((resp) => {
        console.log(resp.body)
        expect(resp.body).to.be.an('array').of.length(12);
      })
  });

  it('should get all candidates', async () => {
    await db.Candidate.create({ email: 'leo1123@gmail.com', cohort: '4' });
    await db.Candidate.create({ email: 'mati@gmail.com', cohort: '5' })
    request(Server)
      .get('/candidate')
      .then((resp) => {
        console.log(resp.body)
        expect(resp.body).to.be.an('array');
      })
  });

  // it('should get all candidates', async () => {
  //   await db.Candidate.create({ email: 'leo3@gmail.com', cohort: '4' })
  //   await db.Candidate.create({ email: 'mati@gmail.com', cohort: '5' })
  //   const response = await request(Server)
  //     .get('/candidate')
  //     console.log(response.body);
  //     expect(response.body).to.be.an('array');
  //     done()
  // });

  //-----ejemplo de internet // claro pero varios objetos como seria? por comas? o en array
  // describe('Insert a country with error: ',()=>{
  //   it('should receive an error', (done) => {
  //   chai.request(url)
  //   .post('/country')
  //   .send({id:1, country: "Madrid", year: 2010, days: 10})
  //   .end( function(err,res){
  //   console.log(res.body)
  //   expect(res).to.have.status(200);
  //   done();
  //   });
  //   });
  //  });

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


import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
import db from '../server/models';

describe('Filter', () => {
  beforeEach(function () {
    db.Candidate.destroy({ where: {} });
  });

  describe('Filter candidates', () => {
    const Jarrod = {
      id: 1,
      firstName: 'Jarrod',
      lastName: 'Davis',
      country: 'Slovenia',
      email: 'Betsy.Kunze87@hotmail.com',
      profilePicture:
        'https://s3.amazonaws.com/uifaces/faces/twitter/marosholly/128.jpg',
      cohort: '7',
      miniBio:
        'Veniam quis a et suscipit consectetur accusantium libero. Aut suscipit qui numquam et in omnis nihil veritatis. Necessitatibus voluptas libero laborum necessitatibus. Quaerat unde ab et non dolor ea q',
      linkedin: 'http://laney.net',
      github: 'http://leo.com',
      visibility: 'unlisted',
      status: 'employed',
    };
    const Laurence = {
      id: 2,
      firstName: 'Laurence',
      lastName: 'Hane',
      country: 'Chad',
      email: 'Tyreek_Nader76@hotmail.com',
      profilePicture:
        'https://s3.amazonaws.com/uifaces/faces/twitter/stushona/128.jpg',
      cohort: '5',
      miniBio:
        'Consectetur et perferendis eius repellendus assumenda nobis. Est aspernatur ratione reprehenderit facilis totam eaque eius veniam. Unde laboriosam autem id tempore saepe expedita. Fugiat quo praesenti',
      linkedin: 'https://terrell.biz',
      github: 'http://manley.biz',
      visibility: 'listed',
      status: 'employed',
    };
    const Drake = {
      id: 3,
      firstName: 'Drake',
      lastName: 'Sipes',
      country: 'Afghanistan',
      email: 'Orie46@gmail.com',
      profilePicture:
        'https://s3.amazonaws.com/uifaces/faces/twitter/bcrad/128.jpg',
      cohort: '5',
      miniBio:
        'Culpa officia rerum dolorem dolores voluptas molestias rerum sint. Fuga sed culpa a. Dolores dolore hic maiores dolorem temporibus maxime qui eum aut.',
      linkedin: 'https://maeve.biz',
      github: 'http://margarett.org',
      visibility: 'listed',
      status: 'employed',
    };
    const Francesco = {
      id: 4,
      firstName: 'Francesco',
      lastName: 'Rath',
      country: 'Cambodia',
      email: 'Alta_Greenfelder80@gmail.com',
      profilePicture:
        'https://s3.amazonaws.com/uifaces/faces/twitter/ripplemdk/128.jpg',
      cohort: '2',
      miniBio:
        'Hic explicabo dicta sint. Aut molestiae et repellat voluptatibus eveniet dolores ut. Harum consequatur molestias. Dolor et et magni modi voluptas perspiciatis facilis facere sed. Eius et eligendi aper',
      linkedin: 'http://alysson.com',
      github: 'http://vivien.info',
      visibility: 'unlisted',
      status: 'unemployed',
    };
    const Andreanne = {
      id: 5,
      firstName: 'Andreanne',
      lastName: 'Morissette',
      country: 'United Kingdom',
      email: 'Mortimer_McKenzie@gmail.com',
      profilePicture:
        'https://s3.amazonaws.com/uifaces/faces/twitter/lawlbwoy/128.jpg',
      cohort: '1',
      miniBio:
        'Earum est dolores. Architecto et neque illo delectus sequi perspiciatis sunt excepturi. Sit dolores voluptate at eum veniam quos voluptatum. Eligendi architecto dignissimos impedit. Reiciendis beatae ',
      linkedin: 'http://quinton.org',
      github: 'http://lottie.com',
      visibility: 'listed',
      status: 'employed',
    };
    const bodyFilterOne = {
      cohorts: '1,2,7,5',
    };
    it('should filter candidates', async () => {
      await db.Candidate.create(Jarrod);
      await db.Candidate.create(Laurence);
      await db.Candidate.create(Drake);
      await db.Candidate.create(Francesco);
      await db.Candidate.create(Andreanne);
      const filterOne = await request(Server)
        .get('/api/filter')
        .send(bodyFilterOne);
      expect(filterOne.body).to.be.an('array').to.have.lengthOf(5);
    });
    const bodyFilterTwo = {
      cohortArray: ['1', '2', '7', '5'],
      locationArray: 'United Kingdom,Afghanistan',
    };
    it('should filter candidates', async () => {
      await db.Candidate.create(Jarrod);
      await db.Candidate.create(Laurence);
      await db.Candidate.create(Drake);
      await db.Candidate.create(Francesco);
      await db.Candidate.create(Andreanne);
      const filterTwo = await request(Server)
        .get('/api/filter')
        .send(bodyFilterTwo);
      expect(filterTwo.body).to.be.an('array').to.have.lengthOf(2);
      expect(filterTwo.body[0].firstName).to.equal('Drake');
      expect(filterTwo.body[1].firstName).to.equal('Andreanne');
    });
  });
});

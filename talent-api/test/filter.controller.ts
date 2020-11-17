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

    const skillsOne = {
      id: 1,
      name: 'trabajo en equipo ',
      type: 'soft',
    };
    const skillsTwo = {
      id: 2,
      name: 'react',
      type: 'hard',
    };
    const skillsThree = {
      id: 3,
      name: 'liderazgo',
      type: 'soft',
    };
    const skillsFour = {
      id: 4,
      name: 'html5',
      type: 'hard',
    };
    const skillsFive = {
      id: 5,
      name: 'javascript',
      type: 'hard',
    };

    const bodyFilterOne = {
      cohorts: '2,7',
    };

    const bodyFilterTwo = {
      cohorts: '1,2,7,5',
      locations: 'United Kingdom,Afghanistan',
    };
    const bodyFilterThree = {
      cohorts: '1,2,7,5',
      locations: 'United Kingdom,Afghanistan',
      skills: 'react,liderazgo,javascript',
    };

    it('should filter candidates', async () => {
      await db.Candidate.create(Jarrod);
      await db.Candidate.create(Laurence);
      await db.Candidate.create(Drake);
      await db.Candidate.create(Francesco);
      await db.Candidate.create(Andreanne);

      await db.Skill.create(skillsOne);
      await db.Skill.create(skillsTwo);
      await db.Skill.create(skillsThree);
      await db.Skill.create(skillsFour);
      await db.Skill.create(skillsFive);

      // await db.candidate_skills.create({ skill_id: 2, candidate_id: 1 });

      const filterOne = await request(Server)
        .get('/api/v1/filter')
        .query({ cohorts: bodyFilterOne.cohorts });
      // console.log('bodyFilterOne', bodyFilterOne.cohorts)
      // console.log(filterOne.body);
      expect(filterOne.body).to.be.an('array').to.have.lengthOf(2);
      expect(filterOne.body[0].id).to.be.equal(1);
      expect(filterOne.body[0].firstName).to.be.equal('Jarrod');
      expect(filterOne.body[1].id).to.be.equal(4);
      expect(filterOne.body[1].firstName).to.be.equal('Francesco');

      const filterTwo = await request(Server).get('/api/v1/filter').query({
        cohorts: bodyFilterTwo.cohorts,
        locations: bodyFilterTwo.locations,
      });
      expect(filterTwo.body).to.be.an('array').to.have.lengthOf(2);
      expect(filterTwo.body[0].firstName).to.equal('Drake');
      expect(filterTwo.body[1].firstName).to.equal('Andreanne');

      const filterThree = await request(Server).get('api/v1/filter').query({
        cohorts: bodyFilterThree.cohorts,
        locations: bodyFilterThree.locations,
        skills: bodyFilterThree.skills,
      });
      expect(filterThree.body).to.be.an('array').to.have.lengthOf(1);
    });
  });
});

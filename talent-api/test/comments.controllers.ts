import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
import db from '../server/models';

describe('Comments', (): void => {
  beforeEach(function () {
    db.Comment.destroy({ where: {} });
  });

  describe('POST Comments', (): void => {
    it('Should add a new Comment to the DB', async (): Promise<void> => {
      const newComment = {
        comment: 'this is a new comment',
      };
      const response = await request(Server)
        .post('/api/v1/comments')
        .send(newComment);
      expect(response.body)
        .to.be.an('object')
        .to.have.property('comment', 'this is a new comment');
    });
    it('Should add a new Comment to the DB with user, folder and recruiter Id', async (): Promise<void> => {
      const newRecruiter = await db.Recruiter.create({
        contactName: 'Victor Alarcon',
        email: 'valarcon@gmail.com',
        company: 'Globant',
        siteUrl: 'www.globant.com',
      });
      const newUser = await db.User.create({
        firstName: 'Federico',
        lastName: 'Calderon',
        profilePicture:
          'https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg',
        role: 'admin',
      });
      const newFolder = await db.Folder.create();
      const newComment = {
        comment: 'this is a new comment',
      };
      const response = await request(Server)
        .post(
          `/api/v1/comments/?recruiterId=${newRecruiter.id}&folderId=${newFolder.id}&userId=${newUser.id}`
        )
        .send(newComment);
      expect(response.body).to.be.an('object').to.have.property('comment', 'this is a new comment')
      expect(response.body).to.be.an('object').to.have.property('recruiterId', newRecruiter.id)
      expect(response.body).to.be.an('object').to.have.property('folderId', newFolder.id)
      expect(response.body).to.be.an('object').to.have.property('userId', newUser.id)
    });
  });

  describe('GET Comments', (): void => {
    it('Should return a list with all comments', async (): Promise<void> => {
      await db.Comment.bulkCreate([{}, {}, {}]);
      const response = await request(Server).get('/api/v1/comments');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.lengthOf(3);
    });
  });

  describe('GET specific Comment', (): void => {
    it('Should return a specific comments', async (): Promise<void> => {
      const newComment = await db.Comment.create({
        comment: 'this is a new comment',
      });
      const response = await request(Server).get(
        `/api/v1/comments/${newComment.id}`
      );
      expect(response.status).to.be.equal(200);
      expect(response.body)
        .to.an('object')
        .to.have.property('comment', 'this is a new comment');
    });
  });

  describe('PUT Comments', (): void => {
    it('Should update all the data in an specific comment', async (): Promise<void> => {
      const bulk = await db.Comment.bulkCreate([{}, {}]);

      const newComment = {
        comment: 'this is a new comment',
      };

      await db.Comment.update(newComment, {
        where: { id: bulk[1].id },
      });

      const foundComment = await db.Comment.findOne({
        where: { id: bulk[1].id },
      });
      expect(foundComment).to.deep.include(newComment);
    });
  });

  describe('DELETE Comments', (): void => {
    it('Should delete an specific comment', async (): Promise<void> => {
      const newComment = await db.Comment.create({
        comment: 'this is a new comment',
      });

      const response = await request(Server).delete(
        `/api/v1/comments/${newComment.id}`
      );
      expect(response.status).to.be.equal(204);
      const foundComment = await db.Comment.findOne({
        where: { id: newComment.id },
      });
      expect(foundComment).to.equal(null);
    });
  });
});

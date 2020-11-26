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
        content: 'this is a new comment',
      };
      const newFolder = await db.Folder.create();
      const newUser = await db.User.create({
        firstName: 'Federico',
        lastName: 'Calderon',
        profilePicture:
          'https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg',
        role: 'admin',
      });
      const response = await request(Server)
        .post(`/api/v1/comments/folder/${newFolder.id}/${newUser.id}`)
        .send(newComment);
      expect(response.body)
        .to.be.an('object')
        .to.have.property('content', 'this is a new comment');
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
        content: 'this is a new comment',
      };
      const response = await request(Server)
        .post(
          `/api/v1/comments/folder/${newFolder.id}/${newUser.id}?recruiterId=${newRecruiter.id}`
        )
        .send(newComment);
      expect(response.body)
        .to.be.an('object')
        .to.have.property('content', 'this is a new comment');
      expect(response.body)
        .to.be.an('object')
        .to.have.property('recruiterId', newRecruiter.id);
      expect(response.body)
        .to.be.an('object')
        .to.have.property('folderId', newFolder.id);
      expect(response.body)
        .to.be.an('object')
        .to.have.property('userId', newUser.id);
    });
  });

  describe('GET specific Comment by Folder Id', (): void => {
    it('Should return a specific comments from a folder', async (): Promise<void> => {
      const newFolder = await db.Folder.create()
      const newComment = await db.Comment.bulkCreate([
        { content: 'new comment 1', folderId: newFolder.id },
        { content: 'new comment 2', folderId: newFolder.id },
        { content: 'new comment 3', folderId: newFolder.id },
        { content: 'new comment 4', folderId: newFolder.id },
      ]);
      const response = await request(Server).get(
        `/api/v1/comments/folder/${newFolder.id}`
      );
      expect(response.status).to.be.equal(200);
      expect(response.body).to.an('array').to.have.lengthOf(4);
    });
  });

  describe('PUT Comments', (): void => {
    it('Should update all the data in an specific comment', async (): Promise<
      void
    > => {
      const comments = await db.Comment.bulkCreate([
        { content: 'new comment 1'},
        { content: 'new comment 2'},
        { content: 'new comment 3'},
        { content: 'new comment 4'},
      ]);
      const newComment = {
        content: 'new comment edited',
      }
      const response = await request(Server)
      .put(`/api/v1/comments/${comments[1].id}`)
      .send(newComment);
      expect(response.status).to.be.equal(200);
      expect(response.body).to.an('array').to.have.length(1);
    });
  });

  describe('DELETE Comments', (): void => {
    it('Should delete an specific comment', async (): Promise<void> => {
      const newComment = await db.Comment.create({
        content: 'this is a new comment',
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

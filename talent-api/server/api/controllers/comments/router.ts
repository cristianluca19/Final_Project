import express from 'express';
import CommentsController from './controller';

export default express
  .Router()
  .get('/', CommentsController.all)
  .get('/:commentId', CommentsController.byId)
  .post('/', CommentsController.add)
  .put('/:commentId', CommentsController.updateById)
  .delete('/:commentId', CommentsController.delete);

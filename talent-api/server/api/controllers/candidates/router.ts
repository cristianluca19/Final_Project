import express from 'express';
import controller from './controller';

export default express
  .Router()
  .get('/', controller.all)
  .put('/visibility/:candidateId', controller.updateById)
  .get('/:candidateId', controller.byId)
  .post('/addToFolder/:candidateId/:folderId', controller.toFolder)
  .delete('/removeFromFolder/:candidateId/:folderId', controller.fromFolder);

import express from 'express';
import candidatesController from './controller';

export default express
  .Router()
  .get('/', candidatesController.all)
  .get('/filterBy/:visibility', candidatesController.byFilter)
  .get('/search', candidatesController.searchByProp)
  .put('/:candidateId/visibility', candidatesController.updateById)
  .get('/:candidateId', candidatesController.byId)
  .post(
    '/:folderId/addCandidate/:candidateId',
    candidatesController.addToFolder
  )
  .delete(
    '/:folderId/removeCandidate/:candidateId',
    candidatesController.deleteFromFolder
  );

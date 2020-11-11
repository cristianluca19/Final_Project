import express from 'express';
import CandidatesController from './controller';

export default express
  .Router()
  .get('/', CandidatesController.all)
  .put('/visibility/:candidateId', CandidatesController.updateById)
  .get('/:candidateId', CandidatesController.byId)
  .post(
    '/:folderId/addCandidate/:candidateId',
    CandidatesController.addToFolder
  );

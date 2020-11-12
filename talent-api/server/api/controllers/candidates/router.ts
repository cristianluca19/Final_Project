import express from 'express';
import upload from '../../middlewares/csvFile';
import candidatesController from './controller';

export default express
  .Router()
  .post('/csv', upload.single('file'), candidatesController.csvToJson)
  .post('/', candidatesController.bulkCreateCandidate)
  .get('/', candidatesController.all)
  .put('/:candidateId/visibility', candidatesController.updateById)
  .get('/:candidateId', candidatesController.byId)
  .post(
    '/:folderId/addCandidate/:candidateId',
    candidatesController.addToFolder
  );

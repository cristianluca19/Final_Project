import express from 'express';
import folderController from './controller';

export default express
  .Router()
  .get('/', folderController.all)
  .post('/', folderController.postFolder)
  .get('/dossier/:uuid', folderController.byUuid)
  .get('/:folderId', folderController.byId)
  .put('/:folderId', folderController.updateById)
  .put('/state/:folderId', folderController.updateStateById)
  .delete('/:folderId', folderController.deleteById);

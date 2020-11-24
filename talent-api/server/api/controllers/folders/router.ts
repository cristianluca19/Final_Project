import express from 'express';
import folderController from './controller';

export default express
  .Router()
  .get('/', folderController.all)
  .get('/models', folderController.allFoldersIncludingModels)
  .post('/', folderController.postFolder)
  .get('/dossier/:uuid', folderController.byUuid)
  .get('/:folderId', folderController.byId)
  .put('/:folderId', folderController.updateById)
  .delete('/:folderId', folderController.deleteById);

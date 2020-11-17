import express from 'express';
import folderController from './controller';

export default express
  .Router()
  .get('/', folderController.all)
  .get('/', folderController.byUuid)
  .post('/', folderController.postFolder)
  .get('/:folderId', folderController.byId)
  .put('/:folderId', folderController.updateById)
  .delete('/:folderId', folderController.deleteById);

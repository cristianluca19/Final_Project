import express from 'express';
import controller from './controller';

export default express.Router().post('/:folderUuid', controller.postFolder);
//   .get('/:candidateId', controller.byId);

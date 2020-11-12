import express from 'express';
import controller from './controller';
import upload from '../../middlewares/csvFile';

export default express
  .Router()
  .get('/', controller.all)
  .post('/csv', upload.single('file'), controller.csvToJson)
  .post('/', controller.bulkCreateCandidate);

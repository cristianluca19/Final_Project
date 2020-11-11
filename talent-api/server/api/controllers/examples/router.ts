import express from 'express';
import controller from './controller';

export default express
  .Router()
  .post('/csv', controller.create)
  .get('/', controller.all)
  .get('/:id', controller.byId);

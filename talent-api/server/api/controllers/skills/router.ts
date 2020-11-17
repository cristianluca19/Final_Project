import express from 'express';
import skillsController from './controller';

export default express
  .Router()
  .get('/', skillsController.all)
  .get('/:skillId', skillsController.byId)
  .post('/', skillsController.create)
  .delete('/:skillId', skillsController.delete)
  .put('/:skillId', skillsController.updateById);

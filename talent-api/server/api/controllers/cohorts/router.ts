import express from 'express';
import cohortController from './controller';

export default express
  .Router()
  .get('/', cohortController.all)
  .delete('/:cohortsId/delete', cohortController.deleteCohort);

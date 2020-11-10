import { Application } from 'express';
import examplesRouter from './api/controllers/examples/router';
import candidateRouter from './api/controllers/candidate/router';


export default function routes(app: Application): void {
  app.use('/api/candidates', candidateRouter);
  app.use('/api/v1/examples', examplesRouter);
}

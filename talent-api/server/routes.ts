import { Application } from 'express';
import examplesRouter from './api/controllers/examples/router';
import candidatesRouter from './api/controllers/candidates/router';
import recruitersRouter from './api/controllers/recruiters/router';

export default function routes(app: Application): void {
  app.use('/api/candidates', candidatesRouter);
  app.use('/api/recruiters', recruitersRouter);
  app.use('/api/v1/examples', examplesRouter);
}

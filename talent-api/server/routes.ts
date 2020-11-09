import { Application } from 'express';
import examplesRouter from './api/controllers/examples/router';
import folderRouter from './api/controllers/folder/router';
import candidateRouter from './api/controllers/candidate/router';


export default function routes(app: Application): void {
  app.use('/api/v1/examples', examplesRouter);
  app.use('/api/v1/folder', folderRouter);
  app.use('/candidate', candidateRouter);

}

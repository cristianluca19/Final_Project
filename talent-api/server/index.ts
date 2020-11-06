import './common/env';
import Server from './common/server';
import db from './models';
import routes from './routes';

const setUpDatabase = async (): Promise<void> => {
  // TODO: turn force off!! At least outside of dev
  const FORCE_SYNC_DB = true;
  await db.sequelize.sync({ force: FORCE_SYNC_DB });
};
setUpDatabase();

const port = parseInt(process.env.PORT);

export default new Server().router(routes).listen(port);

// @ts-nocheck
// /* eslint-disable */
import Sequelize from 'sequelize';
import { url as DB_URL } from '../../db/config.cjs';

import Candidate from './Candidate.model';
import CandidateFolder from './CandidateFolder.model';

interface DB {
  sequelize: any;
  Sequelize: any;
}

// Set up Sequelize connection
const sequelize = new Sequelize(DB_URL, {
  define: {
    underscored: true,
  },
  // TODO: logging
});

// Create all models...
const db: DB = {
  Candidate: Candidate(sequelize),
  CandidateFolder: CandidateFolder(sequelize),
};

// ...and all associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

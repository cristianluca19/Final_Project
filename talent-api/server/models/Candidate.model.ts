/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Model } from 'sequelize';

export default (sequelize) => {
  class Candidate extends Model {
    static associate(models) {
      // define associations here, e.g.
      this.belongsToMany(models.Folder, {
        through: 'folder_candidates',
      });
    }
  }

  Candidate.init(
    {},
    {
      sequelize,
      modelName: 'candidate',
    }
  );

  return Candidate;
};

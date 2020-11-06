/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Folder extends Model {
    static associate(models) {
      // define associations here, e.g.
      this.belongsToMany(models.Candidate, {
        through: 'folder_candidates',
      });
    }
  }

  Folder.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'folder',
    }
  );

  return Folder;
};

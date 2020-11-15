/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Model, DataTypes } from 'sequelize';
import { FOLDER_STATUS } from './enums';

export default (sequelize) => {
  class Folder extends Model {
    static associate(models) {
      // define associations here, e.g.
      this.belongsToMany(models.Candidate, {
        through: 'folder_candidates',
      });
      this.belongsTo(models.Recruiter);
      this.belongsTo(models.User);
    }
  }

  Folder.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      opened: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: [FOLDER_STATUS.Created, FOLDER_STATUS.Sent],
        defaultValue: 'created',
      },
    },
    {
      sequelize,
      modelName: 'folder',
    }
  );

  return Folder;
};

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Folder extends Model {
    static associate(models) {
      // define associations here, e.g.
      // this.belongsToMany(models.Candidate, {
      //   through: 'folder_candidates',
      // });
      //RELATIONS GOES HERE
    }
  }

  Folder.init(
    {
      uuid: { 
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
       },
      opened: { 
        type: DataTypes.BOOLEAN,
        defaultValue: false
       },
    },
    {
      sequelize,
      modelName: 'folder',
    }
  );

  return Folder;
};

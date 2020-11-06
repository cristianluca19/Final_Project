/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class CandidateFolder extends Model {
    static associate(models) {
      // define associations here, e.g.
      this.belongsToMany(models.Candidate, {
        through: 'folderCandidates',
      });
    }
  }

  CandidateFolder.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'candidateFolder',
    }
  );

  return CandidateFolder;
};

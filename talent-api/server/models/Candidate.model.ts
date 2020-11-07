/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Model, DataTypes  } from 'sequelize';

export default (sequelize) => {
  class Candidate extends Model {
    static associate(models) {
      // define associations here, e.g.
      // this.belongsToMany(models.Folder, {
      //   through: 'folder_candidates',
      // });
      //RELATIONS GOES HERE
    }
  }

  Candidate.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cohort: {
        type: DataTypes.STRING,
        allowNull: false
      },
      miniBio: {
        type: DataTypes.STRING,
        allowNull: false
      },
      linkedin: {
        type: DataTypes.STRING,
        allowNull: false
      },
      github: {
        type: DataTypes.STRING,
        allowNull: false
      },
      visibility: {
        type: DataTypes.ENUM,
        values: ['unlisted', 'listed', 'private'],
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM,
        values: ['employed', 'unemployed'],
        allowNull: false
      },
    },
    {
      sequelize,
      modelName: 'candidate',
    }
  );

  return Candidate;
};

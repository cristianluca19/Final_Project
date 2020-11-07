/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Model, DataTypes  } from 'sequelize';

export default (sequelize) => {
  class Candidate extends Model {
    static associate(models) {
      // define associations here, e.g.
      this.belongsToMany(models.Skills, {
        through: 'candidates_skills',
    });
    this.belongsToMany(models.Folder, {
      through: 'folder_candidates',
  });
    }
  }

  Candidate.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true
        }
      },
      cohort: {
        type: DataTypes.STRING,
        allowNull: false
      },
      miniBio: {
        type: DataTypes.STRING,
        allowNull: true
      },
      linkedin: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true
        }
      },
      github: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true
        }
      },
      visibility: {
        type: DataTypes.ENUM,
        values: ['unlisted', 'listed', 'private'],
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM,
        values: ['employed', 'unemployed'],
        allowNull: true
      },
    },
    {
      sequelize,
      modelName: 'candidate',
    }
  );

  return Candidate;
};

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Model, DataTypes } from 'sequelize';
import { SKILLS } from './enums';

export default (sequelize) => {
  class Skill extends Model {
    static associate(models) {
      // define associations here, e.g.
      this.belongsToMany(models.Candidate, {
        through: 'candidate_skills',
      });
    }
  }

  Skill.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM,
        values: [SKILLS.Hard, SKILLS.Soft],
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'skill',
    }
  );
  return Skill;
};
